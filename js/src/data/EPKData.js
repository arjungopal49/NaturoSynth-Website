import React from "react";
import annexPic1 from "./annex1-min.png";
import annexPic2 from "./annex2-min.png";
import annexPic3 from "./annex3-min.png";
import annexPic4 from "./annex4-min.png";
import annexPic5 from "./annex5-min.png";
import profilePic1 from './profilepic1.jpg';
import profilePic2 from './profilepic2.JPG';
import profilePic3 from './profilepic3.JPEG';
import livePic1 from './FullBandPlaying.png'
import livePic2 from './Fullbandsick3.png'
import livePic3 from './bigJunbass2.png';
import livePic4 from './JunRedBacklight.png'
import livePic5 from './PJfrontKieranBackGreen.png'
import livePic6 from './KieranGuitar.png'
import livePic1LowRes from './FullBandPlayingLowRes.png'
import livePic2LowRes from './Fullbandsick3LowRes.png'
import livePic3LowRes from './bigJunbassLowRes.png'
import livePic4LowRes from './JunRedBacklightLowRes.png'
import livePic5LowRes from './PJfrontKieranBackGreenLowRes.png'
import livePic6LowRes from './KieranGuitarLowRes.png'
import {tracks} from "./tracks";




const bioTxt = "NaturoSynth is an innovative Indian-American band from the Chicagoland area that has been creating a distinct fusion of alternative, indie, psychedelic, funk, and dance music since 2019. The band members consist of Arjun Gopal, Kieran Gopal, Pranav Joshi, and Arjun Shamaraya. Their intricate soundscape blends acoustic instrumentation with electronic sound design, creating futuristic yet organic compositions. With melodic guitar leads, driving bass lines, ethereal vocals, and a variety of synthesizers, their palette of sounds pushes the limits of musical expression and transcends traditional genres. They take the listener on a new sonic journey, reflecting their evolving musical vision. They are constantly experimenting to create something exciting and meaningful for the audience and are always striving to exceed the boundaries of what’s possible for them. Their music is a reflection of who they are and the world around them.";
const bioPicSrc = profilePic2;


const latestShowTitle = {text: "Headlined @ The Annex", link: "https://www.eventbrite.com/e/naturosynth-moonglow-conor-keogh-jacob-slade-tickets-686837739167?aff=oddtdtcreator"};
const latestShowDate = "August 11th";
const latestShowLocation = {text: "Madison, WI", link: "https://www.theredzonemadison.com/the-annex/"};
const latestShowPics = [annexPic1, annexPic2, annexPic3, annexPic4, annexPic5];
const latestShowFeaturing = [
    {
        name: "Jacob Slade",
        link: "https://www.instagram.com/jacob_slade_/",
    },
    {
        name: "Conor",
        link: "https://www.instagram.com/conor.keogh/",
    },
    {
        name: "Moonglow",
        link: "https://www.instagram.com/moonglow_the_band/",
    }
]
const latestShowPress = [
    {
        name: "Isthumus",
        link: "https://isthmus.com/events/naturosynth-moonglow-conor-keogh-jacob-slade/"
    },
    {
        name: "Wisconsin State Journal",
        link: "https://madison.com/events/naturosynth-jpg/image_acdff25a-c2b8-54be-95e4-7ab57519b78b.html"
    }
]


const popularTracksTxt = "Our popular tracks come from \"In Control\", our latest EP. \"In Control\" is a collection of 6 pop songs with elements of funk and psychedelia sprinkled all over it. From the driving 80’s inspired electronic drums, clean funk rhythm guitar and the swelling synthesizers of “Through the Motions”, to the smooth bass guitar riffs, groovy conga rhythms and ambient keys of “No More Love”, each song displays a new sound pallet and thematically, provides a new perspective on the emotional effects of a significant other. The EP dives into how someone may manipulate your mind either positively or negatively in ways you may or may not be able to control.";

const featuredOnItems = [
    {
        icon: "Spotify",
        description: "Playlist: Indie Rock (>44K followers) [2023]",
        link: "https://open.spotify.com/playlist/0qYAqOsMGJPntjVEKV5WOF"
    },
    {
        icon: "Spotify",
        description: "Playlist: South Asian Indie (>6K followers) [2023]",
        link: "https://open.spotify.com/playlist/33g9HtxlX4TuqbGAZMnzuF?si=d15982b7466346dd"
    },
    {
        icon: "Radio",
        description: "Radio: Chirp Radio Podcast Interview [2023]",
        link: "https://chirpradio.org/podcasts/naturosynth-interview"
    },
    {
        icon: "Radio",
        description: "Radio: Rukus Avenue Radio (>9M monthly listeners) [2021]",
        link: "https://drive.google.com/file/d/1wVUUBo4I2DvUhbtmlO1C8JK__hO7pnot/view"
    },
    {
        icon: "YouTube",
        description: "Channel: Terminal Passage (>350K subscribers) [2021]",
        link: "https://www.youtube.com/watch?v=7e4uVfJv4yw&t=1152s"
    }

]


const musicVideos = ["https://youtu.be/fSh1X4Hk7JE","https://youtu.be/JpeALdmnDvc","https://youtu.be/VgefFmokJDI"];
const liveVideos = ["https://youtu.be/W61Eqn-Vff8","https://youtu.be/xQBO1YOvdXw"];


const pressPhotos = [
    {
        lowRes: livePic1LowRes,
        highRes: livePic1
    },
    {
        lowRes: profilePic3,
        highRes: profilePic3
    },
    {
        lowRes: livePic2LowRes,
        highRes: livePic2
    },
    {
        lowRes: livePic3LowRes,
        highRes: livePic3
    },
    {
        lowRes: livePic5LowRes,
        highRes: livePic5
    },
    {
        lowRes: livePic6LowRes,
        highRes: livePic6
    },
    {
        lowRes: profilePic1,
        highRes: profilePic1
    },
    {
        lowRes: livePic4LowRes,
        highRes: livePic4
    },
    {
        lowRes: profilePic2,
        highRes: profilePic2
    }
]

const stats = {
    timePeriod: "last 30 days",
    tiktok: {
        views: "900,000",
        likes: "100,000"
    },
    spotify: {
        streams: "450%",
        listeners: "350%"
    },
}


export const epkData = {
    bio: {
        txt: bioTxt,
        src: bioPicSrc
    },

    latestShow: {
        title: latestShowTitle,
        date: latestShowDate,
        location: latestShowLocation,
        pics: latestShowPics,
        featuring: latestShowFeaturing,
        press: latestShowPress
    },

    popularTracks: {
        txt: popularTracksTxt
    },

    featuredOn: {
        items: featuredOnItems
    },

    videos: {
        musicVideos: musicVideos,
        liveVideos: liveVideos
    },

    pressPhotos: pressPhotos,

    audioPlayer: {
        tracks: tracks
    },

    stats: stats
}
