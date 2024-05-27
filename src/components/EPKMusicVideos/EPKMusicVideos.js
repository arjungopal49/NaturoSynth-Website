import React from "react";
import YouTubeEmbeded from "../YouTubeEmbeded/YouTubeEmbeded";
import "./styles.css"

const EPKMusicVideos = ({epkVideosData}) => {
    const getEmbedId = (vid) => {
        vid = vid.toString();
        return vid.substring(vid.lastIndexOf("/")+1);
    }
    return (
        <div className="epkMusicVideos">
            <h1>
                Music Videos
            </h1>
            <div className="epk-VidContainer">
                {epkVideosData.musicVideos.map((vid)=>
                    <YouTubeEmbeded embedId={getEmbedId(vid)}/>
                )}
            </div>
            {/*<h1>*/}
            {/*    Live Videos*/}
            {/*</h1>*/}
            {/*<div className="epk-VidContainer">*/}
            {/*    {epkVideosData.liveVideos.map((vid)=>*/}
            {/*        <YouTubeEmbeded embedId={getEmbedId(vid)}/>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default EPKMusicVideos;