import React from "react";
import './styles.css';
import greenArrow from '../../data/greenarrow3.png';
import spotify from '../../data/spotifytrans.png';
import tiktok from  '../../data/tiktoktrans.png';

const EPKStats = () => {
    return (
        <div className="EPKStats">
            <h1>
                Recent Growth
            </h1>
            <h4 className="EPKStats-sub">
                (last 30 days)
            </h4>

            <div className="statsContainer">
                <p className="EPKStats-text">
                    <a href="https://www.tiktok.com/@naturosynth">TIKTOK<img className="tiktokSmall" src={tiktok} alt={""}/></a>
                    <div>
                        <img className="greenArrow" src={greenArrow} alt={""}/>400,000 views
                    </div>
                    <div>
                        <img className="greenArrow" src={greenArrow} alt={""}/>30,000 likes
                    </div>
                </p>
                <p className="EPKStats-text">
                    <a href="https://open.spotify.com/artist/02j05redex1dmd5aEhwhJp">SPOTIFY<img className="spotifySmall" src={spotify} alt={""}/></a>
                    <div>
                        <img className="greenArrow" src={greenArrow} alt={""}/>300% streams
                    </div>
                    <div>
                        <img className="greenArrow" src={greenArrow} alt={""}/>350% listeners
                    </div>
                </p>
            </div>
        </div>
    );
};


export default EPKStats;