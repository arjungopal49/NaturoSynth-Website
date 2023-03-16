import React from "react";
import PropTypes from "prop-types";

const SpotifyEmbeded = ({ embedId }) => (
    <div className="video-responsive">
        <iframe
            width="500"
            height="500"
            src={`https://open.spotify.com/embed${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded spotify"
        />
    </div>
);

SpotifyEmbeded.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default SpotifyEmbeded;