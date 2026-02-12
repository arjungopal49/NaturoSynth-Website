import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import VideoSection from "../components/VideoSection/VideoSection";
import MusicSection from "../components/MusicSection/MusicSection";
import BandMembersSection from "../components/BandMembersSection/BandMembersSection";
import SocialLogos from "../components/Socials/SocialLogos";
import Footer from "../components/Footer/Footer";
import './styles.css';

const Home = () => {
    return (
        <div className='home-redesign'>
            {/* Hero Section - First impression with band identity + visualizer */}
            <HeroSection />
            
            {/* Live Performance Video + Upcoming Shows - Promote shows */}
            <VideoSection />
            
            {/* Music Catalog - Full discography */}
            <MusicSection />
            
            {/* Band Members - Meet the team */}
            <BandMembersSection />
            
            {/* Social Media Links - Build following */}
            <div className="social-links-section">
                <h2 className="social-section-title">CONNECT WITH US</h2>
                <SocialLogos floating={false} />
            </div>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
