import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles.css';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs, doc, getDoc, Timestamp } from 'firebase/firestore/lite';

const VideoSection = () => {
  const videoRef = useRef(null);
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [showLogo, setShowLogo] = useState(true);
  const [recapVideo, setRecapVideo] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current.paused) {
      videoRef.current.play();
      setShowLogo(false);
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleWrapperClick = () => {
    if (showLogo) {
      videoRef.current.play();
      setShowLogo(false);
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    videoRef.current.currentTime = 0;
    setShowLogo(true);
    setIsPlaying(false);
  };

  useEffect(() => {
    const fetchRecapVideo = async () => {
      try {
        const mediaDocRef = doc(db, 'live music', 'media');
        const docSnapshot = await getDoc(mediaDocRef);
        
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const recap = data?.recap;
          if (recap) {
            setRecapVideo(recap);
          }
        }
      } catch (error) {
        console.error('Error fetching recap video:', error);
      }
    };

    const fetchShows = async () => {
      try {
        const q = query(collection(db, 'live music'), orderBy('date', 'asc'));
        const querySnapshot = await getDocs(q);
        const now = new Date();

        const upcoming = querySnapshot.docs
          .map((showDoc) => ({
            id: showDoc.id,
            ...showDoc.data(),
          }))
          .filter((show) => {
            const showDate = show.date instanceof Timestamp ? show.date.toDate() : new Date(show.date);
            return show.id !== 'media' && !Number.isNaN(showDate.getTime()) && showDate >= now;
          });

        setUpcomingShows(upcoming);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchRecapVideo();
    fetchShows();
  }, []);

  return (
    <div className="video-section-split">
      <div className="section-separator"></div>
      <div className="video-side">
        <div 
          className="video-wrapper" 
          onClick={handleWrapperClick}
          onMouseEnter={() => !showLogo && setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {showLogo && (
            <div className="video-overlay-minimal">
              <svg className="play-icon" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" fill="currentColor"/>
              </svg>
            </div>
          )}
          
          {!showLogo && (
            <div className={`video-controls-overlay ${showControls ? 'visible' : ''}`}>
              <button 
                className="control-btn play-pause-btn"
                onClick={handleVideoClick}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" fill="currentColor"/>
                  </svg>
                )}
              </button>
            </div>
          )}
          
          <video
            ref={videoRef}
            className="performance-video"
            preload="auto"
            onEnded={handleVideoEnd}
          >
            {recapVideo && (
              <source 
                src={recapVideo} 
                type="video/mp4" 
              />
            )}
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>

      <div className="section-separator"></div>
      <div className="shows-side">
        <h2 className="shows-title">Upcoming Shows</h2>
        <div className="shows-list">
          {upcomingShows.length > 0 ? (
            upcomingShows.map((show) => (
              <motion.div 
                key={show.id || `${show.date}-${show.location || show.venue || 'show'}`} 
                className="show-flyer-card"
                style={{
                  backgroundImage: show.flyer 
                    ? `url(${show.flyer})`
                    : 'none'
                }}
              >
                <div className="show-card-content">
                  <div className="show-date">
                    {show.date instanceof Timestamp 
                      ? show.date.toDate().toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })
                      : new Date(show.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })
                    }
                  </div>
                  <div className="show-venue">{show.venue || 'TBA'}</div>
                  <div className="show-location">{show.location || ''}</div>
                  {(show.ticket_link || show.ticketLink) && (
                    <a 
                      href={show.ticket_link || show.ticketLink} 
                      className="show-tickets-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GET TICKETS
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-shows">No upcoming shows at the moment. Check back soon!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
