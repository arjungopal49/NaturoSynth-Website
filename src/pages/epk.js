import React from "react";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import YouTubeEmbeded from "../components/YouTubeEmbeded/YouTubeEmbeded";
import Biography from "../components/Bio/Biography";
import PopularSongs from "../components/PopularSongs/PopularSongs";
import "./styles.css"
import SocialLogos from "../components/Socials/SocialLogos";
import EPKMusicVideos from "../components/EPKMusicVideos/EPKMusicVideos";
import PressPhotos from "../components/PressPhotos/PressPhotos";
import EPKContact from "../components/EPKContact/EPKContact";

const EPK = () => {
    return (
        <div className="epk-full">
            <Biography bio={"NaturoSynth is an innovative, four-piece Indian-American band from the Chicagoland area that has been creating a distinct fusion of alternative, indie, psychedelic, funk, and dance music since 2019. The band members consist of Arjun Gopal, Kieran Gopal, Pranav Joshi, and Arjun Shamaraya. Their intricate soundscape blends acoustic instrumentation with electronic sound design, creating futuristic yet organic compositions. With melodic guitar leads, driving bass lines, ethereal vocals, and a variety of synthesizers, their palette of sounds pushes the limits of musical expression and transcends traditional genres. They take the listener on a new sonic journey, reflecting their evolving musical vision. They are constantly experimenting to create something exciting and meaningful for the audience and are always striving to exceed the boundaries of what’s possible for them. Their music is a reflection of who they are and the world around them."}/>
            <SocialLogos/>
            <div className="epk-popTracksAudioPlayerDiv">
                <PopularSongs desc={"Our popular tracks come from \"In Control\", our latest EP. \"In Control\" is a collection of 6 pop songs with elements of funk and psychedelia sprinkled all over it. From the driving 80’s inspired electronic drums, clean funk rhythm guitar and the swelling synthesizers of “Through the Motions”, to the smooth bass guitar riffs, groovy conga rhythms and ambient keys of “No More Love”, each song displays a new sound pallet and thematically, provides a new perspective on the emotional effects of a significant other. The EP dives into how someone may manipulate your mind either positively or negatively in ways you may or may not be able to control."}/>
                <AudioPlayer/>
            </div>
            <EPKMusicVideos/>
            <PressPhotos/>
            <EPKContact/>
        </div>
    );
};

export default EPK;
