import React from "react";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import YouTubeEmbeded from "../components/YouTubeEmbeded/YouTubeEmbeded";
import Biography from "../components/Bio/Biography";
const EPK = () => {
    return (
        <div>
            <h1>
                Promote our songs please
            </h1>
            <AudioPlayer/>
            <YouTubeEmbeded embedId={"fSh1X4Hk7JE"}/>
            <Biography bio={"Our band is made up of Arjun Gopal, Kieran Gopal, Pranav Joshi, and Arjun Shamaraya, and we are all students based out of the Chicago area. NaturoSynth was originally formed by Kieran, Arjun G, and Pranav. After a couple of months covering some of our favorite songs at local gigs, Arjun S, a close family friend, joined the band and the four of us started writing songs of our own. We went on to release our first single, “Silver Chain”, in the summer of 2019 and released “Reality to Another”, a 5-song, multigenre concept EP in the summer of 2020. The band name, NaturoSynth, reflects the unique blend of acoustic, natural sounds and electronic synthesizers that we incorporate into our music."}/>
        </div>
    );
};

export default EPK;
