import { SocialIcon } from 'react-social-icons';
import React from "react";
import './styles.css';
import { Box } from '@mui/material';

const NewSocialLogos = () => {
    const iconStyle = { width: '40px', height: '40px'};

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5px" }}>
            <SocialIcon className="logo" url={"https://open.spotify.com/artist/02j05redex1dmd5aEhwhJp"} target="_blank" style={iconStyle}/>
            <SocialIcon className="logo" url={"https://music.apple.com/us/artist/naturosynth/1471752653"} network={"itunes"} target="_blank" style={iconStyle}/>
            <SocialIcon className="logo" url={"https://www.youtube.com/channel/UCuj8QuqNH2vXyb26LOyW72g"} target="_blank" style={iconStyle}/>
            <SocialIcon className="logo" url={"https://soundcloud.com/naturo-synth/"} target="_blank" style={iconStyle}/>
            <SocialIcon className="logo" url={"https://www.instagram.com/naturosynth/"} target="_blank" style={iconStyle}/>
            <SocialIcon className="logo" url={"https://www.tiktok.com/@naturosynth"} target="_blank" style={iconStyle}/>
            <SocialIcon className="logo" url={"https://www.facebook.com/naturosynth/"} target="_blank" style={iconStyle}/>
            <SocialIcon className="logo" url={"https://www.twitter.com/naturosynth/"} target="_blank" style={iconStyle}/>
        </Box>
    );
};

export default NewSocialLogos;
