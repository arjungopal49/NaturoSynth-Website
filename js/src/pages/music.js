import React from "react";
import SpotifyEmbeded from "../components/SpotifyEmbeded/SpotifyEmbeded";
import AppleEmbeded from "../components/AppleEmbeded/AppleEmbeded";

const Music = () => {
    return (
        <div className="music-full">
            <h1>
                Listen to our new EP "In Control"
            </h1>
            <SpotifyEmbeded embedId={"/album/06aK2PcIMm933ZEbaWhr9P?utm_source=generator"}/>
            <AppleEmbeded embedId={"/album/in-control-ep/1640268564"}/>
        </div>
    );
};

export default Music;
