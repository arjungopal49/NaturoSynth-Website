import React, { useEffect, useMemo, useState, useRef, useCallback, Fragment } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore/lite";
import { db } from "../firebase";
import { initLenis, destroyLenis } from "../utils/gsapInit";
import { initMusicStack } from "../utils/musicStack";
import "./discography.css";

const getDateValue = (value) => {
  if (!value) return 0;
  if (value instanceof Timestamp) return value.toMillis();
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatDateLabel = (value) => {
  const dateValue = getDateValue(value);
  if (!dateValue) return "Date TBD";
  return new Date(dateValue).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const normalizeSectionEntries = (value) => {
  if (!value) return [];
  if (typeof value === "string") {
    return [{ heading: "", body: value }];
  }
  if (Array.isArray(value)) {
    return value
      .map((entry, idx) => {
        if (typeof entry === "string") return { heading: "", body: entry };
        if (!entry || typeof entry !== "object") return null;
        const heading = entry.heading || entry.title || entry.track || "";
        const body = entry.body || entry.text || entry.content || entry.lyrics || entry.meaning || "";
        if (!heading && !body) return null;
        return { heading, body, order: idx };
      })
      .filter(Boolean);
  }
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([heading, body]) => {
        if (!body) return null;
        return { heading, body: typeof body === "string" ? body : JSON.stringify(body) };
      })
      .filter(Boolean);
  }
  return [];
};

const normalizeLinks = (value) => {
  if (!value) return [];
  if (typeof value === "string") {
    return [{ label: "Open", url: value }];
  }
  if (Array.isArray(value)) {
    return value
      .map((entry, idx) => {
        if (typeof entry === "string") return { label: `Link ${idx + 1}`, url: entry };
        if (!entry || typeof entry !== "object") return null;
        const url = entry.url || entry.href || entry.link || entry.video_url || entry.youtubeUrl;
        if (!url) return null;
        return { label: entry.label || entry.title || entry.name || `Link ${idx + 1}`, url };
      })
      .filter(Boolean);
  }
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([label, url]) => {
        if (!url || typeof url !== "string") return null;
        return { label, url };
      })
      .filter(Boolean);
  }
  return [];
};

const normalizeTracksWithLyrics = (value) => {
  if (!value) return [];
  if (!Array.isArray(value)) return [];
  return value
    .map((entry, idx) => {
      if (typeof entry === "string") {
        return { title: entry.trim(), lyrics: "" };
      }
      if (entry && typeof entry === "object") {
        const videos = [];
        Object.entries(entry).forEach(([key, val]) => {
          if (key.startsWith("youtube_") && typeof val === "string" && val.trim()) {
            const label = key
              .replace(/^youtube_/, "")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());
            videos.push({ label, url: val.trim() });
          }
        });
        return {
          title: entry.title || entry.name || entry.heading || `Track ${idx + 1}`,
          lyrics: entry.lyrics || entry.body || entry.text || entry.content || "",
          videos,
        };
      }
      return null;
    })
    .filter(Boolean);
};

const normalizeRelease = (docItem) => {
  const release = docItem.data();

  const releaseLinks = normalizeLinks(
    release.stream_links ||
      release.streaming_links ||
      release.streaming ||
      release.platform_links ||
      release.stream_link
  );

  const relevantVideos = [];
  Object.entries(release).forEach(([key, value]) => {
    if (key.startsWith("youtube_") && typeof value === "string" && value.trim()) {
      const label = key
        .replace(/^youtube_/, "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      relevantVideos.push({ label, url: value.trim() });
    }
  });

  const title = release.name || "Untitled Release";
  const type = (release.type || "single").toLowerCase();

  let tracks = normalizeTracksWithLyrics(release.tracks || release.tracklist || release.songs);

  if (tracks.length === 0 && release.lyrics && typeof release.lyrics === "string") {
    tracks = [{ title, lyrics: release.lyrics, videos: [] }];
  }

  const trackVideos = tracks.flatMap((t) =>
    (t.videos || []).map((v) => ({ label: `${t.title} — ${v.label}`, url: v.url }))
  );

  const allVideos = [...trackVideos, ...relevantVideos];

  return {
    id: docItem.id,
    title,
    type,
    partOf: release.part_of || "",
    dateValue: getDateValue(release.release_date),
    dateLabel: formatDateLabel(release.release_date),
    coverArt: release.cover_art_url || "",
    releaseLinks,
    tracks,
    lyrics: !tracks.length ? normalizeSectionEntries(release.lyrics) : [],
    meanings: normalizeSectionEntries(release.meanings || release.meaning || release.notes),
    videos: allVideos,
  };
};

const parseLyrics = (raw) => {
  if (!raw) return [];
  return raw.split(/\\n|\n/).map((line) => line.trim());
};

function getYouTubeId(url) {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

const VideoEmbed = ({ label, url }) => {
  const ytId = getYouTubeId(url);
  if (!ytId) return null;
  return (
    <div className="release-video-embed">
      <p className="release-video-label">{label}</p>
      <div className="release-video-responsive">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

const TrackAccordion = ({ releaseId, tracks }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="release-info-section">
      <h3>Tracklist</h3>
      <div className="track-accordion">
        {tracks.map((track, i) => {
          const isOpen = openIndex === i;
          const hasLyrics = Boolean(track.lyrics);
          return (
            <div
              key={`track-${releaseId}-${i}`}
              className={`track-accordion-item${isOpen ? " is-open" : ""}`}
            >
              <button
                type="button"
                className="track-accordion-header"
                onClick={() => hasLyrics && toggle(i)}
                aria-expanded={isOpen}
                style={{ cursor: hasLyrics ? "pointer" : "default" }}
              >
                <span className="track-accordion-number">{i + 1}</span>
                <span className="track-accordion-title">{track.title}</span>
                {hasLyrics && (
                  <span className={`track-accordion-arrow${isOpen ? " is-open" : ""}`}>
                    &#x25BE;
                  </span>
                )}
              </button>
              {isOpen && hasLyrics && (
                <div className="track-accordion-body">
                  {parseLyrics(track.lyrics).map((line, j) =>
                    line === "" ? (
                      <br key={`line-${i}-${j}`} />
                    ) : (
                      <Fragment key={`line-${i}-${j}`}>
                        {line}
                        <br />
                      </Fragment>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Discography = () => {
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRelease, setActiveRelease] = useState(null);

  const sectionRef = useRef(null);
  const lenisRef = useRef(null);
  const stackRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("discography-active");
    return () => document.body.classList.remove("discography-active");
  }, []);

  useEffect(() => {
    const fetchDiscographyData = async () => {
      try {
        let releasesSnapshot;
        try {
          const releasesQuery = query(
            collection(db, "releases"),
            orderBy("release_date", "desc")
          );
          releasesSnapshot = await getDocs(releasesQuery);
        } catch (error) {
          releasesSnapshot = await getDocs(collection(db, "releases"));
        }
        const releaseItems = releasesSnapshot.docs
          .map(normalizeRelease)
          .filter((release) => release.coverArt)
          .sort((a, b) => a.dateValue - b.dateValue);

        setReleases(releaseItems);
      } catch (error) {
        console.error("Error fetching releases for discography:", error);
        setReleases([]);
      }
      setIsLoading(false);
    };
    fetchDiscographyData();
  }, []);

  // Initialize Lenis smooth scroll immediately so the page is always scrollable
  useEffect(() => {
    lenisRef.current = initLenis();
    return () => {
      if (lenisRef.current) destroyLenis(lenisRef.current);
      lenisRef.current = null;
    };
  }, []);

  // Initialize the 3D stack once releases are loaded and rendered
  useEffect(() => {
    if (isLoading || releases.length === 0) return;

    const timer = setTimeout(() => {
      if (sectionRef.current) {
        stackRef.current = initMusicStack(
          sectionRef.current,
          "discography-stack"
        );
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (stackRef.current?.cleanup) stackRef.current.cleanup();
      stackRef.current = null;
    };
  }, [isLoading, releases]);

  const hasReleases = useMemo(() => releases.length > 0, [releases]);

  const openRelease = useCallback((release, event) => {
    if (activeRelease?.id === release.id) {
      closeRelease();
      return;
    }

    const card = event.currentTarget.closest(".music-single");
    if (!card) return;

    if (stackRef.current?.selectSlide) {
      stackRef.current.selectSlide(card, () => {
        setActiveRelease(release);
      });
    }
  }, [activeRelease]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeRelease = useCallback(() => {
    setActiveRelease(null);
    if (stackRef.current?.deselectSlide) {
      stackRef.current.deselectSlide();
    }
  }, []);

  useEffect(() => {
    if (!activeRelease) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeRelease();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeRelease, closeRelease]);

  const releaseHasDetails = (release) =>
    release.releaseLinks.length > 0 ||
    release.tracks.length > 0 ||
    release.lyrics.length > 0 ||
    release.meanings.length > 0 ||
    release.videos.length > 0;

  return (
    <section className="discography-page" ref={sectionRef}>
      <div className="discography-inner">
        <h1 className="discography-title">Discography</h1>

        {isLoading ? (
          <p className="discography-status">Loading discography...</p>
        ) : !hasReleases ? (
          <p className="discography-status">No releases available yet.</p>
        ) : (
          <div className="release-stack">
            <div className="root">
              {releases.map((release, index) => (
                <article
                  key={release.id}
                  className="music-single"
                  style={{ "--stack-index": index }}
                  data-release-id={release.id}
                >
                  <button
                    type="button"
                    className="release-cover-button"
                    onClick={(e) => openRelease(release, e)}
                    aria-label={`${release.title} – ${release.dateLabel}`}
                  >
                    <img
                      src={release.coverArt}
                      alt={`${release.title} cover art`}
                      className="release-cover"
                    />
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeRelease && (
        <div
          className="release-info-panel"
          key={activeRelease.id}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <button
            className="release-info-close"
            onClick={closeRelease}
            aria-label="Close"
          >
            &#x2715;
          </button>

          <div className="release-info-content">
          <h2 className="release-info-title">{activeRelease.title}</h2>
          <div className="release-info-meta">
            <span className="release-type-badge">{activeRelease.type === "ep" ? "EP" : "Single"}</span>
            <span className="release-info-date">{activeRelease.dateLabel}</span>
          </div>
          {activeRelease.partOf && (
            <p className="release-part-of">From <em>{activeRelease.partOf}</em></p>
          )}

          {activeRelease.releaseLinks.length > 0 && (
            <div className="release-info-links">
              {activeRelease.releaseLinks.map((linkItem) => (
                <a
                  key={`info-${activeRelease.id}-${linkItem.label}`}
                  href={linkItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="release-chip-link"
                >
                  {linkItem.label}
                </a>
              ))}
            </div>
          )}

          {activeRelease.videos.length > 0 && (
            <div className="release-info-section">
              <h3>Videos</h3>
              {activeRelease.videos.map((vid) => (
                <VideoEmbed
                  key={`vid-${activeRelease.id}-${vid.label}`}
                  label={vid.label}
                  url={vid.url}
                />
              ))}
            </div>
          )}

          {activeRelease.tracks.length > 0 && (
            <TrackAccordion
              releaseId={activeRelease.id}
              tracks={activeRelease.tracks}
            />
          )}

          {activeRelease.lyrics.length > 0 && (
            <div className="release-info-section">
              <h3>Lyrics</h3>
              {activeRelease.lyrics.map((entry, i) => (
                <div key={`info-lyrics-${i}`} className="release-copy-block">
                  {entry.heading && <h4>{entry.heading}</h4>}
                  <p>{entry.body}</p>
                </div>
              ))}
            </div>
          )}

          {activeRelease.meanings.length > 0 && (
            <div className="release-info-section">
              <h3>Meanings</h3>
              {activeRelease.meanings.map((entry, i) => (
                <div key={`info-meanings-${i}`} className="release-copy-block">
                  {entry.heading && <h4>{entry.heading}</h4>}
                  <p>{entry.body}</p>
                </div>
              ))}
            </div>
          )}

          {!releaseHasDetails(activeRelease) && (
            <div className="release-info-section">
              <p className="release-fallback-text">
                More details for this release are coming soon.
              </p>
            </div>
          )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Discography;
