import React from "react";
import SpotifyEmbeded from "../components/SpotifyEmbeded/SpotifyEmbeded";

const Music = () => {
    return (
        <div className="music-full">
            <h1>
                Listen to our new EP "In Control"
            </h1>
            <SpotifyEmbeded embedId={"/album/06aK2PcIMm933ZEbaWhr9P?utm_source=generator"}/>
        </div>
    );
};

export default Music;
