import React from "react";
import YouTubeEmbeded from "../components/YouTubeEmbeded/YouTubeEmbeded";

const Videos = () => {
    return (
        <div>
            <h1>
                Check out our videos:
            </h1>
            <YouTubeEmbeded embedId={"fSh1X4Hk7JE"}/>
            <YouTubeEmbeded embedId={"JpeALdmnDvc"}/>
            <YouTubeEmbeded embedId={"VgefFmokJDI"}/>
            <YouTubeEmbeded embedId={"W61Eqn-Vff8"}/>
            <YouTubeEmbeded embedId={"xQBO1YOvdXw"}/>
            <YouTubeEmbeded embedId={"videoseries?list=PLGrXf4ZffHPdQWr8xxDDC_tI8PpO_NdKf"}/>
            <YouTubeEmbeded embedId={"7e4uVfJv4yw"}/>
        </div>
    );
};

export default Videos;
