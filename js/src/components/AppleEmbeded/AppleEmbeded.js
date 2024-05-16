import React from "react";
import PropTypes from "prop-types";
import './styles.css'

const AppleEmbeded = ({ embedId }) => (
    <div className="apple-responsive">
        <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder="0"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src={`https://embed.music.apple.com/us${embedId}`}
                title="Embedded apple"
        />
    </div>
);

AppleEmbeded.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default AppleEmbeded;