import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';
import './styles.css';

const MusicSection = () => {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchReleases = async () => {
      const q = query(
        collection(db, 'releases'),
        orderBy('release_date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const releasesData = querySnapshot.docs.map(doc => doc.data());
      setReleases(releasesData);
    };
    
    fetchReleases();
  }, []);

  return (
    <div className="music-section-new">
      <h1 className="music-section-title">
        DISCOGRAPHY
      </h1>
      
      <div className="releases-grid">
        {releases.map((release, index) => (
          <motion.a 
            href={release.stream_link} 
            target="_blank" 
            rel="noopener noreferrer" 
            key={index}
            className="release-item"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="album-cover-container">
              <img 
                src={release.cover_art_url} 
                alt={`${release.name || 'Release'}`} 
                className="album-cover-image" 
              />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default MusicSection;
