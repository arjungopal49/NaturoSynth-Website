import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';
import { optimizeCloudinaryVideoUrl } from '../../cloudinary';
import './styles.css';

// Import band photo as background
const bandPhoto = require('../../data/Pictures/Performances/2026_01_24_BeatKitchen/BK1.jpg');

const HeroSection = () => {
  const [release, setRelease] = useState(null);
  const [isFutureRelease, setIsFutureRelease] = useState(false);
  const [violinClip, setViolinClip] = useState(null);
  const [droneClip, setDroneClip] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [activeClip, setActiveClip] = useState('violin'); // 'violin' or 'drone'
  const violinVideoRef = useRef(null);
  const droneVideoRef = useRef(null);

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        const q = query(
          collection(db, 'releases'),
          orderBy('release_date', 'desc'),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestRelease = querySnapshot.docs[0].data();
          
          // Check if release date is in the future
          const releaseDate = latestRelease.release_date?.toDate 
            ? latestRelease.release_date.toDate() 
            : new Date(latestRelease.release_date);
          
          const now = new Date();
          const isFuture = releaseDate > now;
          
          setIsFutureRelease(isFuture);
          setRelease(latestRelease);

          // Get video clips from the release and optimize them
          if (latestRelease.violin_clip) {
            const optimizedViolinUrl = optimizeCloudinaryVideoUrl(latestRelease.violin_clip);
            setViolinClip(optimizedViolinUrl);
          }
          if (latestRelease.drone_clip) {
            const optimizedDroneUrl = optimizeCloudinaryVideoUrl(latestRelease.drone_clip);
            setDroneClip(optimizedDroneUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching latest release for hero:', error);
      }
    };

    fetchLatestRelease();
  }, []);

  const handleMouseEnter = () => {
    if (!violinClip || !droneClip) return;
    
    setIsHovering(true);
    
    // Resume the currently active clip from where it left off
    // Videos will start playing once they're buffered (preload="auto" handles this)
    if (activeClip === 'violin' && violinVideoRef.current) {
      violinVideoRef.current.play().catch(err => {
        console.error('Error playing violin clip:', err);
      });
    } else if (activeClip === 'drone' && droneVideoRef.current) {
      droneVideoRef.current.play().catch(err => {
        console.error('Error playing drone clip:', err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    
    // Just pause, don't reset - keep position for resume
    if (violinVideoRef.current) {
      violinVideoRef.current.pause();
    }
    if (droneVideoRef.current) {
      droneVideoRef.current.pause();
    }
  };

  const handleViolinEnded = () => {
    if (!isHovering) return;
    
    // Switch to drone clip and start from beginning
    setActiveClip('drone');
    if (droneVideoRef.current) {
      droneVideoRef.current.currentTime = 0;
      droneVideoRef.current.play().catch(err => {
        console.error('Error playing drone clip:', err);
      });
    }
  };

  const handleDroneEnded = () => {
    if (!isHovering) return;
    
    // Switch back to violin clip and start from beginning
    setActiveClip('violin');
    if (violinVideoRef.current) {
      violinVideoRef.current.currentTime = 0;
      violinVideoRef.current.play().catch(err => {
        console.error('Error playing violin clip:', err);
      });
    }
  };

  return (
    <div className="hero-section-new" style={{
      backgroundImage: `url(${bandPhoto})`
    }}>
      <div className="hero-overlay-new"></div>
      
      {/* Background Video Layer */}
      {violinClip && droneClip && (
        <div className={`hero-video-background ${isHovering ? 'visible' : ''}`}>
          <div className="hero-video-overlay"></div>
          <video
            ref={violinVideoRef}
            className={`hero-background-video ${activeClip === 'violin' && isHovering ? 'active' : ''}`}
            src={violinClip}
            muted
            playsInline
            preload="auto"
            onEnded={handleViolinEnded}
          >
            <source src={violinClip} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            ref={droneVideoRef}
            className={`hero-background-video ${activeClip === 'drone' && isHovering ? 'active' : ''}`}
            src={droneClip}
            muted
            playsInline
            preload="auto"
            onEnded={handleDroneEnded}
          >
            <source src={droneClip} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      
      <div className={`hero-content-centered ${isHovering ? 'blurred' : ''}`}>
        {/* Album Cover + Release Info + CTA */}
        {release && (
          <div className="hero-release-section">
            <div 
              className="hero-album-container-centered"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {release.cover_art_url && (
                <img 
                  src={release.cover_art_url} 
                  alt={`${release.name} cover art`}
                  className="hero-album-cover-centered"
                />
              )}
            </div>

            <div className="hero-release-info-centered">
              <h3 className="hero-release-name-centered">{release.name}</h3>
            </div>

            {release.stream_link && (
              <motion.a 
                href={release.stream_link}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-stream-button-centered"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFutureRelease ? 'Pre-Save Now' : 'Listen Now'}
              </motion.a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
