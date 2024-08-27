import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase'; // Make sure this path is correct
import './styles.css'; // Import your styles

const TikTokFeed = () => {
    const [tiktoks, setTikToks] = useState([])

    useEffect(() => {
        const fetchTikToks = async () => {
          const querySnapshot = await getDocs(collection(db, 'tiktoks'));
          const fetchedTikToks = querySnapshot.docs.map(doc => doc.data().url);
          setTikToks(fetchedTikToks);
        };
        fetchTikToks();
    }, []);

    return (
        <div className="tiktok-embed-container">
          {tiktoks.map((url, index) => (
            <div key={index} className="tiktok-embed">
              <blockquote className="tiktok-embed" cite={url} data-video-id={url.split('/').pop()}>
                <a href={url}></a>
              </blockquote>
            </div>
          ))}
        </div>
    );
};

export default TikTokFeed;