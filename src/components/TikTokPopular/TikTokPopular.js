import React from "react";
import './styles.css'
import tikTokLogo from '../../data/Pictures/Icons/tiktokLogoBlack.png'

const TikTokPopular = ({ tiktoks }) => (
    <div className="tikTokPopular">
        <h1>
            Viral TikTok Videos
        </h1>
        <div className="tiktok-images">
            {tiktoks.map((tt)=>
                <div className="imageContainer">
                    <a href={tt.link} target="_blank">
                        <img className="tiktokImg" src={tt.image} alt={""}/>
                        <img className="tiktokLogo" src={tikTokLogo} alt={""}/>
                    </a>
                </div>
            )}
        </div>
    </div>

);

export default TikTokPopular;