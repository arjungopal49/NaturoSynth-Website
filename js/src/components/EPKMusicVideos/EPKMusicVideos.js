import React from "react";
import YouTubeEmbeded from "../YouTubeEmbeded/YouTubeEmbeded";
import "./styles.css"

const EPKMusicVideos = () => {
    return (
        <div className="epkMusicVideos">
            <h1>
                Music Videos
            </h1>
            <div className="epk-VidContainer">
                <YouTubeEmbeded embedId={"fSh1X4Hk7JE"}/>
                <YouTubeEmbeded embedId={"JpeALdmnDvc"}/>
                <YouTubeEmbeded embedId={"VgefFmokJDI"}/>
            </div>
            <h1>
                Live Videos
            </h1>
            <div className="epk-VidContainer">
                <YouTubeEmbeded embedId={"W61Eqn-Vff8"}/>
                <YouTubeEmbeded embedId={"xQBO1YOvdXw"}/>
            </div>
        </div>
    );
};

export default EPKMusicVideos;