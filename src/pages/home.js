import React from "react";
import SocialLogos from "../components/Socials/SocialLogos";
import RecentRelease from "../components/RecentRelease/RecentRelease";
import VideoSection from "../components/VideoSection/VideoSection";
import PhotoScroll from "../components/PhotoScroll/PhotoScroll";
import MusicSection from "../components/MusicSection/MusicSection";
import TikTokFeed from "../components/TikTokFeed/TikTokFeed";
import BackgroundSeparator from "../components/BackgroundSeparator/BackgroundSeparator";
import './styles.css'

const Home = () => {
    return (
        <div className='Background'>
        <div className="home-full">
            <RecentRelease />
            <VideoSection />
            <BackgroundSeparator imageUrl="https://firebasestorage.googleapis.com/v0/b/naturosynth-backend.appspot.com/o/Pictures%2FPerformances%2FAnnexAug11%2Fconcert.jpg?alt=media&token=afcb72b0-c940-4ea3-8226-732802320a7d"/>
            <SocialLogos />
            <MusicSection />
            <BackgroundSeparator imageUrl="https://firebasestorage.googleapis.com/v0/b/naturosynth-backend.appspot.com/o/Pictures%2FPerformances%2FSubTJun14%2FIMG_2924.jpeg?alt=media&token=f761f277-8740-467e-80bc-61360a5c236c"/>
            {/* <PhotoScroll /> */}
            <BackgroundSeparator imageUrl="https://firebasestorage.googleapis.com/v0/b/naturosynth-backend.appspot.com/o/Pictures%2FPerformances%2FSubTJun14%2FIMG_4520.png?alt=media&token=d276c9a9-de5b-49e0-9846-a526c225d78c"/>
        </div>
        </div>
    );
};

export default Home;
