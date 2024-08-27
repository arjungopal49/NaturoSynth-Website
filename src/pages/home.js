import React from "react";
import SocialLogos from "../components/Socials/SocialLogos";
import RecentRelease from "../components/RecentRelease/RecentRelease";
import VideoSection from "../components/VideoSection/VideoSection";
import PhotoScroll from "../components/PhotoScroll/PhotoScroll";
import InstagramFeed from "../components/MusicSection/MusicSection";
import TikTokFeed from "../components/TikTokFeed/TikTokFeed";

const Home = () => {
    return (
        <div className='Background'>
        <div className="home-full">
            <RecentRelease/>
            <VideoSection/>
            <SocialLogos/>
            <PhotoScroll/>
            <InstagramFeed/>
            <TikTokFeed/>
        </div>
        </div>
    );
};

export default Home;
