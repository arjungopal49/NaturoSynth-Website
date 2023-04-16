import { SocialIcon } from 'react-social-icons';
import React from "react";
import './styles.css'

const SocialLogos = () => {
    return (
        <div className="socialLogos-container">
                <SocialIcon className="logo" url={"https://open.spotify.com/artist/02j05redex1dmd5aEhwhJp"}/>
                <SocialIcon className="logo" url={"https://music.apple.com/us/artist/naturosynth/1471752653"} network={"itunes"}/>
                <SocialIcon className="logo" url={"https://soundcloud.com/naturo-synth/"}/>
                <SocialIcon className="logo" url={"https://www.youtube.com/channel/UCuj8QuqNH2vXyb26LOyW72g"}/>
                <SocialIcon className="logo" url={"https://www.instagram.com/naturosynth/"}/>
                <SocialIcon className="logo" url={"https://www.twitter.com/naturosynth/"}/>
                <SocialIcon className="logo" url={"https://www.tiktok.com/@naturosynth"}/>
                <SocialIcon className="logo" url={"https://www.facebook.com/naturosynth/"}/>
        </div>
    );
};


export default SocialLogos;