import React from "react";
import './styles.css';

const PopularSongs = ({popularTracksData}) => {
    return (
        <div className="popSongs">
            <h1> Our Recent Tracks </h1>
            <p className="popSongsTxt">
                {popularTracksData.txt}
            </p>
        </div>
    );
};


export default PopularSongs;