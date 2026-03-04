import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore/lite";
import "./shows.css";

const formatDate = (date) => {
  const d = date instanceof Timestamp ? date.toDate() : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getDateObj = (date) => {
  if (date instanceof Timestamp) return date.toDate();
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? null : d;
};

const geocodeCache = {};

async function geocodeLocation(locationStr) {
  if (!locationStr) return null;
  const key = locationStr.trim().toLowerCase();
  if (geocodeCache[key]) return geocodeCache[key];

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&countrycodes=us&limit=1&q=${encodeURIComponent(
        locationStr
      )}`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    if (data && data.length > 0) {
      const coords = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
      geocodeCache[key] = coords;
      return coords;
    }
  } catch (err) {
    console.error("Geocoding failed for:", locationStr, err);
  }
  return null;
}

function getYouTubeId(url) {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

const SVG_W = 975;
const SVG_H = 610;
const PAGE_STAR_COUNT = 500;

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const pageStars = (() => {
  const rand = seededRandom(77);
  return Array.from({ length: PAGE_STAR_COUNT }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    size: 0.4 + rand() * 1.6,
    delay: rand() * 7,
    dur: 2 + rand() * 5,
    opacity: 0.15 + rand() * 0.55,
  }));
})();

const Shows = () => {
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [pastShows, setPastShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [hoveredShow, setHoveredShow] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);

  const projection = useMemo(
    () => geoAlbersUsa().scale(1280).translate([SVG_W / 2, SVG_H / 2]),
    []
  );

  const [usPath, setUsPath] = useState(null);

  useEffect(() => {
    let cancelled = false;
    import("us-atlas/states-10m.json").then((mod) => {
      if (cancelled) return;
      const us = mod.default || mod;
      const path = geoPath().projection(projection);
      const nation = feature(us, us.objects.nation);
      setUsPath(path(nation));
    });
    return () => { cancelled = true; };
  }, [projection]);

  useEffect(() => {
    const fetchAndGeocode = async () => {
      try {
        const q = query(collection(db, "live music"), orderBy("date", "asc"));
        const snapshot = await getDocs(q);
        const now = new Date();

        const allShows = snapshot.docs
          .filter((d) => d.id !== "media")
          .map((d) => ({ id: d.id, ...d.data() }));

        const upcoming = [];
        const past = [];

        allShows.forEach((show) => {
          const dateObj = getDateObj(show.date);
          if (!dateObj) return;
          if (dateObj >= now) upcoming.push(show);
          else past.push(show);
        });

        const geocodeShow = async (show) => {
          const coords = await geocodeLocation(show.location);
          return { ...show, coords };
        };

        const [geocodedUpcoming, geocodedPast] = await Promise.all([
          Promise.all(upcoming.map(geocodeShow)),
          Promise.all(past.map(geocodeShow)),
        ]);

        setUpcomingShows(geocodedUpcoming);
        setPastShows(geocodedPast.reverse());
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchAndGeocode();
  }, []);

  useEffect(() => {
    if (!selectedShow) return;
    document.documentElement.style.overflow = "hidden";
    const handler = (e) => {
      if (e.key === "Escape") setSelectedShow(null);
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [selectedShow]);

  const handleMouseMove = useCallback((e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;
    setParallax({ x: dx * 30, y: dy * 30 });
  }, []);

  const projectCoords = useCallback(
    (coords) => {
      if (!coords || !projection) return null;
      return projection([coords.lng, coords.lat]);
    },
    [projection]
  );

  const handleStarClick = useCallback((show, e) => {
    e.stopPropagation();
    setSelectedShow((prev) => (prev?.id === show.id ? null : show));
  }, []);

  const collectYouTubeVideos = (show) => {
    const videos = [];
    Object.entries(show).forEach(([k, v]) => {
      if (k.startsWith("youtube_") && typeof v === "string" && v.trim()) {
        const label = k
          .replace(/^youtube_/, "")
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        videos.push({ label, url: v.trim() });
      }
    });
    return videos;
  };

  const collectPhotos = (show) => {
    if (Array.isArray(show.photos))
      return show.photos.filter((p) => typeof p === "string");
    return [];
  };

  const allShowsSorted = useMemo(() => {
    const combined = [...pastShows, ...upcomingShows]
      .filter((s) => s.coords)
      .sort((a, b) => {
        const da = getDateObj(a.date);
        const db2 = getDateObj(b.date);
        if (!da || !db2) return 0;
        return da - db2;
      });
    return combined;
  }, [pastShows, upcomingShows]);

  const constellationPoints = useMemo(() => {
    return allShowsSorted
      .map((show) => {
        const pt = projection([show.coords.lng, show.coords.lat]);
        return pt ? { show, x: pt[0], y: pt[1] } : null;
      })
      .filter(Boolean);
  }, [allShowsSorted, projection]);

  const constellationPath = useMemo(() => {
    if (constellationPoints.length < 2) return "";
    return constellationPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  }, [constellationPoints]);

  const pathLength = useMemo(() => {
    let len = 0;
    for (let i = 1; i < constellationPoints.length; i++) {
      const dx = constellationPoints[i].x - constellationPoints[i - 1].x;
      const dy = constellationPoints[i].y - constellationPoints[i - 1].y;
      len += Math.sqrt(dx * dx + dy * dy);
    }
    return len;
  }, [constellationPoints]);

  const hoveredPos = useMemo(() => {
    if (!hoveredShow?.coords) return null;
    return projectCoords(hoveredShow.coords);
  }, [hoveredShow, projectCoords]);

  const isPast = useCallback(
    (show) => pastShows.some((s) => s.id === show.id),
    [pastShows]
  );

  return (
    <div
      className="shows-page"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
    >
      <div
        className="page-stars"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      >
        {pageStars.map((star, i) => (
          <span
            key={`ps-${i}`}
            className="page-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.dur}s`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {upcomingShows.length > 0 && (
        <section className="upcoming-banner">
          <h2 className="upcoming-title">Upcoming Shows</h2>
          <div className="upcoming-scroll">
            {upcomingShows.map((show) => (
              <div
                key={show.id}
                className="upcoming-card"
                style={{
                  backgroundImage: show.flyer ? `url(${show.flyer})` : "none",
                }}
              >
                <div className="upcoming-card-content">
                  <div className="upcoming-card-date">{formatDate(show.date)}</div>
                  <div className="upcoming-card-venue">{show.venue || "TBA"}</div>
                  <div className="upcoming-card-location">{show.location || ""}</div>
                  {(show.ticket_link || show.ticketLink) && (
                    <a
                      href={show.ticket_link || show.ticketLink}
                      className="upcoming-card-tickets"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GET TICKETS
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="constellation-section">
        <h2 className="constellation-title">Where We&rsquo;ve Been</h2>

        <div
          className="constellation-canvas"
          ref={canvasRef}
        >
          <svg
            className="constellation-svg"
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="starGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="starGlowBright">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {usPath && <path d={usPath} className="us-silhouette" />}

            {/* Constellation lines */}
            {constellationPath && pathLength > 0 && (
              <path
                d={constellationPath}
                className="constellation-line"
                filter="url(#lineGlow)"
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: pathLength,
                }}
              />
            )}

            {/* Show stars */}
            {constellationPoints.map(({ show, x, y }) => {
              const past = isPast(show);
              const isHovered = hoveredShow?.id === show.id;
              const isSelected = selectedShow?.id === show.id;
              const active = isHovered || isSelected;
              return (
                <g
                  key={`star-${show.id}`}
                  className={`show-star-group ${past ? "past" : "upcoming"} ${active ? "active" : ""}`}
                  onClick={(e) => handleStarClick(show, e)}
                  onMouseEnter={() => setHoveredShow(show)}
                  onMouseLeave={() => setHoveredShow(null)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 12 : 8}
                    className={`star-pulse ${past ? "star-pulse-past" : "star-pulse-upcoming"}`}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 5.5 : 4}
                    className={`star-dot ${past ? "star-dot-past" : "star-dot-upcoming"}`}
                    filter={past ? "url(#starGlow)" : "url(#starGlowBright)"}
                  />
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip */}
          {hoveredShow && !selectedShow && hoveredPos && (
            <div
              className="hover-tooltip"
              style={{
                left: `${(hoveredPos[0] / SVG_W) * 100}%`,
                top: `${(hoveredPos[1] / SVG_H) * 100}%`,
              }}
            >
              {hoveredShow.flyer && (
                <img src={hoveredShow.flyer} alt="" className="hover-tooltip-flyer" />
              )}
              <span className="hover-tooltip-venue">
                {hoveredShow.venue || hoveredShow.location || "Show"}
              </span>
            </div>
          )}

          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-dot past-dot" />
              <span>Past Shows</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot upcoming-dot" />
              <span>Upcoming</span>
            </div>
          </div>
        </div>
      </section>

      {selectedShow && (
        <div
          className="show-detail-overlay"
          ref={overlayRef}
          onClick={(e) => {
            if (e.target === overlayRef.current) setSelectedShow(null);
          }}
        >
          <button
            className="show-detail-close"
            onClick={() => setSelectedShow(null)}
            aria-label="Close"
          >
            &#x2715;
          </button>
          <div className="show-detail-flyer">
            {selectedShow.flyer ? (
              <img
                src={selectedShow.flyer}
                alt={selectedShow.venue || "Show flyer"}
                className="show-detail-flyer-img"
              />
            ) : (
              <div className="show-detail-flyer-placeholder">No Flyer Available</div>
            )}
          </div>
          <div className="show-detail-info">
            <div className="show-detail-info-content">
              <h2 className="show-detail-venue">{selectedShow.venue || "Venue TBA"}</h2>
              <p className="show-detail-location">{selectedShow.location || ""}</p>
              <p className="show-detail-date">{formatDate(selectedShow.date)}</p>
              {selectedShow.sold && (
                <p className="show-detail-sold">{selectedShow.sold}</p>
              )}
              {!isPast(selectedShow) && (selectedShow.ticket_link || selectedShow.ticketLink) && (
                <a
                  href={selectedShow.ticket_link || selectedShow.ticketLink}
                  className="show-detail-tickets"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GET TICKETS
                </a>
              )}
              {collectYouTubeVideos(selectedShow).map((vid) => {
                const ytId = getYouTubeId(vid.url);
                if (!ytId) return null;
                return (
                  <div key={vid.label} className="show-detail-video">
                    <p className="show-detail-video-label">{vid.label}</p>
                    <div className="show-detail-video-responsive">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                        title={vid.label}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                );
              })}
              {collectPhotos(selectedShow).length > 0 && (
                <div className="show-detail-photos">
                  {collectPhotos(selectedShow).map((url, i) => (
                    <img
                      key={`photo-${i}`}
                      src={url}
                      alt={`${selectedShow.venue || "Show"} ${i + 1}`}
                      className="show-detail-photo"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shows;
