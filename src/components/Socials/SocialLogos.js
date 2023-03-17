import { SocialIcon } from 'react-social-icons';
import React from "react";
import './styles.css'

const SocialLogos = () => {
    return (
        <div className="socialLogos-container">
            <div className={"logos"}>
                <SocialIcon url={"https://open.spotify.com/artist/02j05redex1dmd5aEhwhJp"}/>
                <SocialIcon url={"https://music.apple.com/us/artist/naturosynth/1471752653"} network={"itunes"}/>
                <SocialIcon url={"https://soundcloud.com/naturo-synth/"}/>
                <SocialIcon url={"https://www.youtube.com/channel/UCuj8QuqNH2vXyb26LOyW72g"}/>
            </div>
            <div className={"logos"}>
                <SocialIcon url={"https://www.instagram.com/naturosynth/"}/>
                <SocialIcon url={"https://www.twitter.com/naturosynth/"}/>
                <SocialIcon url={"https://www.tiktok.com/@naturosynth"}/>
                <SocialIcon url={"https://www.facebook.com/naturosynth/"}/>
            </div>
        </div>
    );
};


export default SocialLogos;