import React from "react";
import './styles.css';

const EPKPlaylists = ({playlistsData}) => {
    return (
        <div className="EPKPlaylists">
            <h1> Playlist Placements </h1>
            <div className="playlistList">
                {playlistsData.items.map((playlist)=>
                    <iframe
                        src={playlist.link.replace('.com', '.com/embed')}
                        className="playlistItem"
                        frameBorder="0" allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy">
                    </iframe>
                )}
            </div>
        </div>
    );
};


export default EPKPlaylists;