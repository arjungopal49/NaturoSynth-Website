import React, { useRef, useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';
import './styles.css';

const BandMembersSection = () => {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [centeredIndex, setCenteredIndex] = useState(5); // Start at middle set (5 = first card of second array)
  const lastWrapTime = useRef(0);
  const [bandMembers, setBandMembers] = useState([]);
  
  // Fetch band members from Firebase
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'individual'));
        const members = querySnapshot.docs.map(doc => ({
          name: doc.id,
          photo: doc.data().photo
        }));
        setBandMembers(members);
      } catch (error) {
        console.error('Error fetching band members:', error);
      }
    };
    
    fetchMembers();
  }, []);
  
  // Triple the members array for infinite scroll effect
  const tripleMembers = [...bandMembers, ...bandMembers, ...bandMembers];
  
  // Get card width based on screen size
  const getCardWidth = () => {
    if (window.innerWidth <= 480) return 240 + 24; // mobile: card + gap
    if (window.innerWidth <= 768) return 300 + 32; // tablet: card + gap
    return 400 + 48; // desktop: card + gap
  };
  
  // Update which card is centered
  const updateCenteredCard = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = getCardWidth();
    
    // Calculate the center of the viewport
    const viewportCenter = scrollLeft + (container.offsetWidth / 2);
    
    // Calculate padding offset based on screen size
    let paddingLeft;
    if (window.innerWidth <= 480) {
      paddingLeft = (container.offsetWidth / 2) - (240 / 2);
    } else if (window.innerWidth <= 768) {
      paddingLeft = (container.offsetWidth / 2) - (300 / 2);
    } else {
      paddingLeft = (container.offsetWidth / 2) - (400 / 2);
    }
    
    // Find which card is centered
    // We need to account for the left padding and calculate position within the card strip
    const positionInStrip = viewportCenter - paddingLeft;
    const index = Math.round(positionInStrip / cardWidth);
    
    setCenteredIndex(index);
  }, []);
  
  // Initialize scroll position to middle set
  useEffect(() => {
    if (scrollContainerRef.current && bandMembers.length > 0) {
      const initializeScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        const cardWidth = getCardWidth();
        
        // Calculate left padding
        let paddingLeft;
        if (window.innerWidth <= 480) {
          paddingLeft = (container.offsetWidth / 2) - (240 / 2);
        } else if (window.innerWidth <= 768) {
          paddingLeft = (container.offsetWidth / 2) - (300 / 2);
        } else {
          paddingLeft = (container.offsetWidth / 2) - (400 / 2);
        }
        
        // Position so first card of middle set (index 5) is centered
        // We need: paddingLeft + (index * cardWidth) to be at the center
        // scrollLeft + (containerWidth / 2) = paddingLeft + (5 * cardWidth)
        // scrollLeft = paddingLeft + (5 * cardWidth) - (containerWidth / 2)
        const targetCardPosition = paddingLeft + (5 * cardWidth);
        const scrollPosition = targetCardPosition - (container.offsetWidth / 2);
        
        container.scrollLeft = scrollPosition;
        
        // Force update centered card immediately
        updateCenteredCard();
      };
      
      // Initialize immediately and after a delay to ensure layout is settled
      initializeScroll();
      const timer = setTimeout(initializeScroll, 150);
      
      return () => clearTimeout(timer);
    }
  }, [bandMembers, updateCenteredCard]);
  
  // Handle infinite scroll and center detection
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = getCardWidth();
    const totalWidth = bandMembers.length * cardWidth;
    
    // Update centered card
    updateCenteredCard();
    
    if (isScrolling) return;
    
    // Prevent rapid consecutive wraps
    const now = Date.now();
    if (now - lastWrapTime.current < 500) return;
    
    // Calculate which set we're in (0 = first, 1 = middle, 2 = last)
    const currentSet = Math.floor(scrollLeft / totalWidth);
    
    // Only wrap when we're in the first or last set, not the middle
    // If we're past the middle of the last set (set 2), wrap to middle set (set 1)
    if (currentSet >= 2) {
      lastWrapTime.current = now;
      setIsScrolling(true);
      const positionInSet = scrollLeft % totalWidth;
      const newPosition = totalWidth + positionInSet;
      
      // Temporarily disable smooth scrolling and snap for instant jump
      container.style.scrollBehavior = 'auto';
      container.style.scrollSnapType = 'none';
      container.scrollLeft = newPosition;
      
      requestAnimationFrame(() => {
        container.style.scrollBehavior = 'smooth';
        container.style.scrollSnapType = 'x mandatory';
        setIsScrolling(false);
        updateCenteredCard();
      });
    }
    // If we're in the first half of the first set (set 0), wrap to middle set (set 1)
    else if (currentSet === 0 && scrollLeft < totalWidth / 2) {
      lastWrapTime.current = now;
      setIsScrolling(true);
      const positionInSet = scrollLeft % totalWidth;
      const newPosition = totalWidth + positionInSet;
      
      // Temporarily disable smooth scrolling and snap for instant jump
      container.style.scrollBehavior = 'auto';
      container.style.scrollSnapType = 'none';
      container.scrollLeft = newPosition;
      
      requestAnimationFrame(() => {
        container.style.scrollBehavior = 'smooth';
        container.style.scrollSnapType = 'x mandatory';
        setIsScrolling(false);
        updateCenteredCard();
      });
    }
  };
  
  // Show loading state while fetching
  if (bandMembers.length === 0) {
    return (
      <div className="band-members-section">
        <div className="section-separator"></div>
        <h1 className="band-members-title">THE BAND</h1>
        <p style={{ color: '#ffffff', textAlign: 'center' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="band-members-section">
      <div className="section-separator"></div>
      
      <h1 className="band-members-title">
        THE BAND
      </h1>
      
      <div 
        className="members-grid" 
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {tripleMembers.map((member, index) => {
          const isCentered = index === centeredIndex;
          return (
            <div
              key={`${member.name}-${index}`}
              className={`member-card ${isCentered ? 'centered' : ''}`}
            >
              <div className="member-photo-container">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="member-photo" 
                />
              </div>
              <h3 className="member-name">{member.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BandMembersSection;
