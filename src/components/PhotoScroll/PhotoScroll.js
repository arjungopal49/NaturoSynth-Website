import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase'; // Ensure correct import path for Firebase
import './styles.css'; // Import the CSS file for styling

const PhotoScroll = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first real image
  const slideRef = useRef();
  const transitionTime = 500; // Match this with your CSS transition

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'images'));
        const fetchedPhotos = querySnapshot.docs.map(doc => doc.data().link);

        setPhotos([fetchedPhotos[fetchedPhotos.length - 1], ...fetchedPhotos, fetchedPhotos[0]]);
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
    };

    fetchImages();
  }, []);

  const handleNextPhoto = () => {
    if (!photos.length) return;
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handlePrevPhoto = () => {
    if (!photos.length) return;
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  useEffect(() => {
    const slideElement = slideRef.current;

    slideElement.style.transition = `transform ${transitionTime}ms ease-in-out`;

    // Change the position of the carousel
    slideElement.style.transform = `translateX(-${currentIndex * 100}%)`;

    // After the transition, handle the reset to real images
    const handleTransitionEnd = () => {
      if (currentIndex === photos.length - 1) {
        // If on the last cloned image, jump to the first real image
        slideElement.style.transition = 'none'; // Disable transition to prevent sliding effect
        setCurrentIndex(1); // Jump to the first real image
        slideElement.style.transform = `translateX(-100%)`; // Reset to the first real image's position
      } else if (currentIndex === 0) {
        // If on the first cloned image, jump to the last real image
        slideElement.style.transition = 'none'; // Disable transition to prevent sliding effect
        setCurrentIndex(photos.length - 2); // Jump to the last real image
        slideElement.style.transform = `translateX(-${(photos.length - 2) * 100}%)`; // Reset to the last real image's position
      }
    };

    // Listen for the transition end event
    slideElement.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      slideElement.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex, photos.length]);

  return (
    <div className="carousel-container">
      <button className="arrow-button left" onClick={handlePrevPhoto}>
        &lt;
      </button>
      <div className="slide-container" ref={slideRef}>
        {photos.map((photo, index) => (
          <div className="image-container" key={index}>
            <img className="image" src={photo} alt={`Photo ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="arrow-button right" onClick={handleNextPhoto}>
        &gt;
      </button>
    </div>
  );
};

export default PhotoScroll;
