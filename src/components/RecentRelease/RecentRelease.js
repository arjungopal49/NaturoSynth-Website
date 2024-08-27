import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore/lite';
import './styles.css';
import { db } from '../../firebase'; // Correct import path for db

const RecentRelease = () => {
  const [release, setRelease] = useState(null);

  useEffect(() => {
    const getRecentRelease = async () => {
      try {
        console.log('Querying releases collection...');
        const q = query(
          collection(db, 'releases'),
          orderBy('release_date', 'desc'), // Corrected field name
          limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('No documents found in releases collection.');
        } else {
          const latestRelease = querySnapshot.docs.map(doc => doc.data())[0];
          console.log('Fetched release:', latestRelease);
          setRelease(latestRelease);
        }
      } catch (error) {
        console.error('Error fetching release: ', error);
      }
    };

    getRecentRelease();
  }, []);

  return (
    <div className='Container'>
      {release ? (
        // Container containing button and Cover Art
          <div className='Photo'>
          {release.cover_art_url ? (
            <img className='Img' src={release.cover_art_url} alt={`${release.name} cover art`}/>
          ) : (
            <p>No cover art available</p>
          )}
          </div>

      ) : (
        <p>Loading...</p>
      )}
      {release ? (
      <div>
        {release.stream_link ? (
        <a className='Button' href={release.stream_link}>Pre-Save Now</a>
        ) : (
            <p>No stream link available</p>
        )}
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecentRelease;
