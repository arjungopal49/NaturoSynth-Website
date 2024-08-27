// src/components/VideoSection/VideoSection.js
import React, { useRef } from 'react';
import './styles.css'; // Ensure you update your CSS as well

const VideoSection = () => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0; // Reset video when mouse leaves
  };

  return (
    <div className="video-section">
      <div className="video-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <video ref={videoRef} className="teaser-video" loop>
          <source src="https://firebasestorage.googleapis.com/v0/b/naturosynth-backend.appspot.com/o/Videos%2FNaturoSynth%20Concert%20Edit%20Final.mp4?alt=media&token=c69fb5be-8492-4c68-995a-b19af9b3f98e" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
    </div>
  );
};

export default VideoSection;
