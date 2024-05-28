import React from "react";
import profilePic1 from './Pictures/Profile/profilepic1.jpg';
import profilePic2 from './Pictures/Profile/profilepic2.JPG';
import profilePic3 from './Pictures/Profile/profilepic3.JPEG';
import junePic2 from './Pictures/Profile/june23pic2.jpg'
import junePic3 from './Pictures/Profile/june23pic3.JPG'
import junePic4 from './Pictures/Profile/june23pic4.JPG'
import annexPic1 from "./Pictures/Performances/AnnexAug11/annex1-min.jpg";
import annexPic2 from "./Pictures/Performances/AnnexAug11/annex2-min.jpg";
import annexPic3 from "./Pictures/Performances/AnnexAug11/annex3-min.jpg";
import annexPic4 from "./Pictures/Performances/AnnexAug11/annex4-min.jpg";
import annexPic5 from "./Pictures/Performances/AnnexAug11/annex5-min.jpg";
import annexPic6 from "./Pictures/Performances/AnnexMar9/IMG_7075.jpg"
import {tracks} from "./Songs/tracks";

import forTikTok from './Pictures/TikTokScreenshots/fearOfRegretTikTok.png'
import hoTiktok1 from './Pictures/TikTokScreenshots/headphonesOnTikTok.png'
import hoTiktok2 from './Pictures/TikTokScreenshots/headphonesOnTikTok2.png'
import hoTiktok3 from './Pictures/TikTokScreenshots/headphonesOnTikTok3.png'
import imageTikTok1 from './Pictures/TikTokScreenshots/imageTikTok.png'
import imageTikTok2 from './Pictures/TikTokScreenshots/imageTikTok2.png'
import nmlTikTok from './Pictures/TikTokScreenshots/nmlTikTok.png'
import ttmTikTok from './Pictures/TikTokScreenshots/ttmTikTok.png'
import ttmTikTok2 from './Pictures/TikTokScreenshots/ttmTikTok2.png'
import {AnnexAug11} from "./Pictures/Performances/AnnexAug11/AnnexAug11";
import {AnnexMar9} from "./Pictures/Performances/AnnexMar9/AnnexMar9";




const bioTxt = "NaturoSynth is an innovative Indian-American band from the Chicagoland area that has been creating a distinct fusion of alternative, indie, psychedelic, funk, and dance music since 2019. The band members consist of Arjun Gopal, Kieran Gopal, Pranav Joshi, and Arjun Shamaraya. Their intricate soundscape blends acoustic instrumentation with electronic sound design, creating futuristic yet organic compositions. With melodic guitar leads, driving bass lines, ethereal vocals, and a variety of synthesizers, their palette of sounds pushes the limits of musical expression and transcends traditional genres. They take the listener on a new sonic journey, reflecting their evolving musical vision. They are constantly experimenting to create something exciting and meaningful for the audience and are always striving to exceed the boundaries of what’s possible for them. Their music is a reflection of who they are and the world around them.";
const bioPicSrc = profilePic2;



const danceDestinyTxt = "Our latest track \"Dance Destiny\" is an electrifying summer anthem that seamlessly intertwines elements of electronic, disco and psych-pop. Inspired by the profound spiritual concept of reincarnation, the song narrates the timeless tale of two souls, destined to meet and dance across multiple lifetimes, bound by an eternal love. With its punchy bass hooks, bouncy drum grooves, infectious melodies, and ethereal synths, \"Dance Destiny\" invites listeners on a transcendental sonic journey. \"Headphones On\" and \"Fear of Regret\" are our two previous singles that have amassed over 300K streams on Spotify and over 1M views on TikTok. Our other popular tracks come from our 2022 EP, \"In Control\"."
const popularTracksTxt = "Our popular tracks come from \"In Control\", our latest EP. \"In Control\" is a collection of 6 pop songs with elements of funk and psychedelia sprinkled all over it. From the driving 80’s inspired electronic drums, clean funk rhythm guitar and the swelling synthesizers of “Through the Motions”, to the smooth bass guitar riffs, groovy conga rhythms and ambient keys of “No More Love”, each song displays a new sound pallet and thematically, provides a new perspective on the emotional effects of a significant other. The EP dives into how someone may manipulate your mind either positively or negatively in ways you may or may not be able to control.";

const playlists = [
    {
        description: "Playlist: indie pop - happy/chill (>56K followers)",
        link: "https://open.spotify.com/playlist/0tIHZPCv0MeCb3wnsFllAg",
        song: "Headphones On",
    },
    {
        description: "Playlist: Indie Rock (>59K followers)",
        link: "https://open.spotify.com/playlist/0qYAqOsMGJPntjVEKV5WOF",
        song: "The Image",
    },
    {
        description: "Playlist: Pop Chillout (>22K followers)",
        link: "https://open.spotify.com/playlist/4IKoiXaRoT1GqIGm52XJDd",
        song: "Dance Destiny",
    },
    {
        description: "Playlist: Modern Indie Alt Pop (>29K followers)",
        link: "https://open.spotify.com/playlist/4bmNkaMUEj2g5J17bMm7GQ",
        song: "Dance Destiny",
    },
    {
        description: "Playlist: South Asian Indie (>6K followers)",
        link: "https://open.spotify.com/playlist/33g9HtxlX4TuqbGAZMnzuF?si=d15982b7466346dd",
        song: "Fear of Regret",
    },
    {
        description: "Playlist: Popüler İngilizce Şarkılar 2023",
        link: "https://open.spotify.com/playlist/2je6dYaxDWb6IRiU6ZTMaG?si=d733919497714176",
        song: "Headphones On",
    }
]
const featuredOnItems = [
    {
        icon: "sharethis",
        description: "Article: Wisconsin State Journal Interview",
        link: "https://madison.com/life-entertainment/local/music/naturosynth-madison-tiktok/article_93236afa-dccb-11ee-805f-e32ca8036159.html"
    },
    {
        icon: "Radio",
        description: "Radio: Chirp Radio Podcast Interview",
        link: "https://chirpradio.org/podcasts/naturosynth-interview"
    },
    {
        icon: "Radio",
        description: "Radio: Rukus Avenue Radio Interview",
        link: "https://drive.google.com/file/d/1wVUUBo4I2DvUhbtmlO1C8JK__hO7pnot/view"
    },
    {
        icon: "YouTube",
        description: "Channel: Terminal Passage EP Repost",
        link: "https://www.youtube.com/watch?v=7e4uVfJv4yw&t=1152s"
    }

]


const musicVideos = ["https://youtu.be/fSh1X4Hk7JE","https://youtu.be/JpeALdmnDvc","https://youtu.be/VgefFmokJDI"];
const liveVideos = ["https://youtu.be/W61Eqn-Vff8","https://youtu.be/xQBO1YOvdXw"];


const pressPhotos = [
    annexPic1, annexPic2, annexPic6,
    annexPic4, annexPic5, annexPic3,
    junePic2, junePic3, junePic4,
    profilePic3, profilePic1, profilePic2,
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

const tiktoks = [
    {
        image: hoTiktok1,
        link: "https://www.tiktok.com/@naturosynth/photo/7285127888360181038?is_from_webapp=1&sender_device=pc&web_id=7346340367413036575"
    },
    {
        image: ttmTikTok,
        link: "https://www.tiktok.com/@naturosynth/photo/7223526259257609514?is_from_webapp=1&sender_device=pc&web_id=7346340367413036575"
    },
    {
        image: imageTikTok1,
        link: "https://www.tiktok.com/@naturosynth/photo/7238739491651996970?is_from_webapp=1&sender_device=pc&web_id=7346340367413036575"
    },
    {
        image: hoTiktok2,
        link: "https://www.tiktok.com/@naturosynth/photo/7282893617545497899?is_from_webapp=1&sender_device=pc&web_id=7346340367413036575"
    },
    {
        image: forTikTok,
        link: "https://www.tiktok.com/@naturosynth/photo/7327812760258219310?is_from_webapp=1&sender_device=pc&web_id=7346340367413036575"
    },
    {
        image: imageTikTok2,
        link: "https://www.tiktok.com/@naturosynth/photo/7224266682364382510?is_from_webapp=1&sender_device=pc&web_id=7346340367413036575"
    },
    {
        image: ttmTikTok2,
        link: "https://www.tiktok.com/@naturosynth/video/7201283771013041454?is_from_webapp=1&sender_device=pc&web_id=7346340367413036575"
    },
    {
        image: hoTiktok3,
        link: "https://www.tiktok.com/@naturosynth/photo/7288100434928225582?is_from_webapp=1&sender_device=pc&web_id=7346340367413036575"
    },
    {
        image: nmlTikTok,
        link: "https://www.tiktok.com/@naturosynth/photo/7202752304741715243?is_from_webapp=1&sender_device=pc&web_id=7346340367413036575"
    }
]



export const epkData = {
    bio: {
        txt: bioTxt,
        src: bioPicSrc
    },

    latestShow: AnnexMar9,

    popularTracks: {
        txt: danceDestinyTxt
    },

    tiktoks: tiktoks,

    playlists: {
        items: playlists
    },

    featuredOn: {
        items: featuredOnItems
    },

    videos: {
        musicVideos: musicVideos,
        liveVideos: liveVideos,
    },

    pressPhotos: pressPhotos,

    audioPlayer: {
        tracks: tracks
    },

    stats: stats,
}
