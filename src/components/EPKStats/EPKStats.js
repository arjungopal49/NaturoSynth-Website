import React from "react";
import './styles.css';
import greenArrow from '../../data/Pictures/Icons/greenarrow3.png';
import spotify from '../../data/Pictures/Icons/spotifytrans.png';
import tiktok from '../../data/Pictures/Icons/tiktokLogoColor.png';

const EPKStats = ({epkStatsData}) => {
    return (
        <div className="EPKStats">
            <h1>
                Recent Growth
            </h1>
            <h4 className="EPKStats-sub">
                ({epkStatsData.timePeriod})
            </h4>

            <div className="statsContainer">
                <p className="EPKStats-text">
                    <a href="https://www.tiktok.com/@naturosynth">TIKTOK<img className="tiktokSmall" src={tiktok} alt={""}/></a>
                    <div>
                        <img className="greenArrow" src={greenArrow} alt={""}/>{epkStatsData.tiktok.views} views
                    </div>
                    <div>
                        <img className="greenArrow" src={greenArrow} alt={""}/>{epkStatsData.tiktok.likes} likes
                    </div>
                </p>
                <p className="EPKStats-text">
                    <a href="https://open.spotify.com/artist/02j05redex1dmd5aEhwhJp">SPOTIFY<img className="spotifySmall" src={spotify} alt={""}/></a>
                    <div>
                        <img className="greenArrow" src={greenArrow} alt={""}/>{epkStatsData.spotify.streams} streams
                    </div>
                    <div>
                        <img className="greenArrow" src={greenArrow} alt={""}/>{epkStatsData.spotify.listeners} listeners
                    </div>
                </p>
            </div>
        </div>
    );
};


export default EPKStats;