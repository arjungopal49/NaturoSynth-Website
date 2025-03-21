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
import TikTokPopular from "../components/TikTokPopular/TikTokPopular";
import EPKPlaylists from "../components/EPKPlaylists/EPKPlaylists";
import ShowsList from "../components/ShowsList/ShowsList";

const EPK = () => {
    return (
        <div className="epk-full">
            <Biography epkBioData={epkData.bio}/>
            <SocialLogos floating={true} />
            <div className="epk-socialGrowthDiv">
                <ShowsList />
                <EPKStats epkStatsData={epkData.stats}/>
            </div>
            <LatestPerformance />
            <div className="epk-popTracksAudioPlayerDiv">
                <PopularSongs popularTracksData={epkData.popularTracks}/>
                <AudioPlayer/>
            </div>
            <TikTokPopular tiktoks={epkData.tiktoks}/>
            <div className="epk-playlistsPressDiv">
                <EPKPlaylists playlistsData={epkData.playlists}/>
                <FeaturedOn featuredOnData={epkData.featuredOn}/>
            </div>
            <EPKMusicVideos epkVideosData={epkData.videos}/>
            <PressPhotos pressPhotosData={epkData.pressPhotos}/>
            <EPKContact/>
        </div>
    );
};

export default EPK;
