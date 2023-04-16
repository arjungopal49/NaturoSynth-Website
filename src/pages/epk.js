import React from "react";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import Biography from "../components/Bio/Biography";
import PopularSongs from "../components/PopularSongs/PopularSongs";
import "./styles.css"
import SocialLogos from "../components/Socials/SocialLogos";
import EPKMuiscVideos from "../components/EPKMusicVideos/EPKMusicVideos";
import PressPhotos from "../components/PressPhotos/PressPhotos";

const EPK = () => {
    return (
        <div className="epk-full">
            <Biography bio={"NaturoSynth is an innovative, four-piece Indian-American band from the Chicagoland area that has been creating a distinct fusion of alternative, indie, psychedelic, funk, and dance music since 2019. The band members consist of Arjun Gopal, Kieran Gopal, Pranav Joshi, and Arjun Shamaraya. Their intricate soundscape blends acoustic instrumentation with electronic sound design, creating futuristic yet organic compositions. With melodic guitar leads, driving bass lines, ethereal vocals, and a variety of synthesizers, their palette of sounds pushes the limits of musical expression and transcends traditional genres. They take the listener on a new sonic journey, reflecting their evolving musical vision. They are constantly experimenting to create something exciting and meaningful for the audience and are always striving to exceed the boundaries of what’s possible for them. Their music is a reflection of who they are and the world around them."}/>
            <SocialLogos/>
            <div className="epk-popTracksAudioPlayerDiv">
                <PopularSongs desc={"description description description image description description descrin description ttm description description description description descion description description description description description description lpafop description description description description description description description description aflhk description description description description description description description description description apple description description description description asdfhjl description description description description naturo description synth description description lol description af description description description description description description description in control description description description description timeless description description night description description description description description description description description description description description description description description description description description"}/>
                <AudioPlayer/>
            </div>
            <EPKMuiscVideos/>
            <PressPhotos/>
        </div>
    );
};

export default EPK;
