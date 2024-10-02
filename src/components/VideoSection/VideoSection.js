import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore/lite';

const VideoSection = () => {
  const videoRef = useRef(null);
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [previousShows, setPreviousShows] = useState([]);
  const [showLogo, setShowLogo] = useState(true);

  const handleVideoClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setShowLogo(false);
    } else {
      videoRef.current.pause();
      setShowLogo(true);
    }
  };

  const handleVideoEnd = () => {
    videoRef.current.currentTime = 0; // Reset video to the start
    setShowLogo(true);
  };

  useEffect(() => {
    const fetchShows = async () => {
      const q = query(
        collection(db, 'shows'),
        orderBy('date', 'desc') // Fetch shows ordered by date
      );
      const querySnapshot = await getDocs(q);
      const now = new Date(); // Current date/time

      const upcoming = [];
      const previous = [];

      querySnapshot.docs.forEach(doc => {
        const show = doc.data();
        const showDate = new Date(show.date); // Assuming date is stored in a format parsable by Date()

        if (showDate >= now) {
          upcoming.push(show);
        } else {
          previous.push(show);
        }
      });

      setUpcomingShows(upcoming);
      setPreviousShows(previous);
    };

    fetchShows();
  }, []);


  return (
    <div className="live-music-section">
      <h1 className="live-music-title">LIVE MUSIC</h1>
      <div className="video-container" onClick={handleVideoClick}>
        {showLogo && (
          <div className="video-logo-overlay">
            <img src="https://firebasestorage.googleapis.com/v0/b/naturosynth-backend.appspot.com/o/Pictures%2FIcons%2FNSLogoWhite.png?alt=media&token=e2455fd7-4e98-4b0b-a4ae-46902c5c5c2a" alt="Logo" className="logo-image" />
          </div>
        )}
        <video
          ref={videoRef}
          className="teaser-video"
          preload="auto"
          onEnded={handleVideoEnd}
        >
          <source src="https://firebasestorage.googleapis.com/v0/b/naturosynth-backend.appspot.com/o/Videos%2FNaturoSynth%20Concert%20Edit%20Final.mp4?alt=media&token=c69fb5be-8492-4c68-995a-b19af9b3f98e" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
      {/* Upcoming Shows Section */}
      <div className="upcoming-shows">
        <h2 className="show-headers">Upcoming</h2>
        {upcomingShows.length > 0 ? (
          upcomingShows.map((show, index) => (
            <div key={index} className="show">
              <img src={show.flyerUrl} alt="Show Flyer" className="flyer-img" />
              {show.ticketLink ? (
                <a href={show.ticketLink} className="ticket-button">
                  Get Tickets
                </a>
              ) : (
                <p className="ticket-free">Free!</p>
              )}
            </div>
          ))
        ) : (
          <p>Stay tuned...</p>
        )}
      </div>

      {/* Previous Shows Section */}
      <div className="previous-shows">
        <h2 className="show-headers">Previous</h2>
        {previousShows.length > 0 ? (
          previousShows.map((show, index) => (
            <div key={index} className="show">
              <img src={show.flyerUrl} alt="Show Flyer" className="flyer-img" />
              {/* No ticket link for previous shows */}
            </div>
          ))
        ) : (
          <p>No previous shows available.</p>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
