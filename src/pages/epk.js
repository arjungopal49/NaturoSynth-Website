import React from "react";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import Biography from "../components/Bio/Biography";
import PopularSongs from "../components/PopularSongs/PopularSongs";
import "./styles.css"
import SocialLogos from "../components/Socials/SocialLogos";
import EPKMusicVideos from "../components/EPKMusicVideos/EPKMusicVideos";
import PressPhotos from "../components/PressPhotos/PressPhotos";
import EPKContact from "../components/EPKContact/EPKContact";
import FeaturedOn from "../components/FeaturedOn/FeaturedOn";
import EPKStats from "../components/EPKStats/EPKStats";
import LatestPerformance from "../components/LatestPerformance/LatestPerformance";
import {epkData} from "../data/EPKData";

const EPK = () => {
    return (
        <div className="epk-full">
            <Biography epkBioData={epkData.bio}/>
            <div className="epk-socialGrowthDiv">
                <SocialLogos/>
                <EPKStats epkStatsData={epkData.stats}/>
            </div>
            <LatestPerformance latestPerformanceData={epkData.latestShow}/>
            <div className="epk-popTracksAudioPlayerDiv">
                <PopularSongs popularTracksData={epkData.popularTracks}/>
                <AudioPlayer tracks={epkData.audioPlayer.tracks}/>
            </div>
            <FeaturedOn featuredOnData={epkData.featuredOn}/>
            <EPKMusicVideos epkVideosData={epkData.videos}/>
            <PressPhotos pressPhotosData={epkData.pressPhotos}/>
            <EPKContact/>
        </div>
    );
};

export default EPK;
