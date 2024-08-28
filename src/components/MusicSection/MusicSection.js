import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase'; // Ensure correct import path for Firebase
import './styles.css'; // Assuming you're styling through styles.css

const MusicSection = () => {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchReleases = async () => {
      const q = query(
        collection(db, 'releases'),
        orderBy('release_date', 'desc'), // Corrected field name
        // limit(8)
      );
      const querySnapshot = await getDocs(q);
      const releasesData = querySnapshot.docs.map(doc => doc.data());
      setReleases(releasesData);
    };
    
    fetchReleases();
  }, []);

  return (
    <div className="music-section">
      <h1 className="music-title">MUSIC</h1>
      <div className="cover-arts">
      {releases.map((release, index) => (
        <a href={release.stream_link} target="_blank" rel="noopener noreferrer" key={index}>
          <img src={release.cover_art_url} alt={`Release ${index}`} className="cover-art" />
        </a>
      ))}
      </div>
    </div>
  );
};

export default MusicSection;
