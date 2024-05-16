import React from "react";
import './styles.css';

const PopularSongs = ({desc}) => {
    return (
        <div className="popSongs">
            <h1> Our Popular Tracks </h1>
            <p className="popSongsTxt">
                {desc}
            </p>
        </div>
    );
};


export default PopularSongs;