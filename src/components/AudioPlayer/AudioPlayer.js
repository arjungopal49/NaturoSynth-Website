import { useRef, useState, useEffect } from 'react';

// import components
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import TrackList from './TrackList';
// import TopBar from './TopBar';
import './styles.css';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import art from '../../data/Songs/CoverArts/dance_destiny.jpg'

import { db } from '../../firebase';
import { collection, getDocs} from 'firebase/firestore/lite';

const AudioPlayer = () => {
    // states
    const [tracks, setTracks] = useState([]);
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(
        null
    );
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    // reference
    const audioRef = useRef();
    const progressBarRef = useRef();

    useEffect(() => {
        if (tracks.length > 0) {
            setCurrentTrack(tracks[trackIndex])
            console.log(currentTrack)
// eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [tracks]);
    
    useEffect(() => {
        fetchSongs();
    }, []);
    
    const fetchSongs = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "songs"));
          const songsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const topSongs = songsList
            .filter(song => song.rank >= 1 && song.rank <= 10)
            .sort((a, b) => a.rank - b.rank);

          setTracks(topSongs);
        } catch (error) {
          console.error("Error fetching songs:", error);
        }
    };

    const handleNext = () => {
        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
        } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
        }
    };

    return (
        <>
            <div>

            </div>
            <div className="audio-player">
                <div className="current-player">
                        <div className="audio-image">
                            <a target="_blank" rel="noreferrer" href={currentTrack ? currentTrack.link : ""}>
                                <img src={currentTrack ? require("../../data/Songs" + currentTrack.coverArt) : ""} alt="audio avatar" />
                            </a>
                        </div>
                        <div className="right-side-of-coverart">
                            <DisplayTrack
                                {...{
                                    currentTrack,
                                    audioRef,
                                    setDuration,
                                    progressBarRef,
                                    handleNext,
                                }}
                            />
                            <div className="progressBar-controls-wrapper">
                                <ProgressBar
                                    {...{ progressBarRef, audioRef, timeProgress, duration }}
                                />
                                <Controls
                                    {...{
                                        audioRef,
                                        progressBarRef,
                                        duration,
                                        setTimeProgress,
                                        tracks,
                                        trackIndex,
                                        setTrackIndex,
                                        setCurrentTrack,
                                        handleNext,
                                    }}
                                />
                            </div>
                        </div>

                </div>
                <TrackList
                    {...{
                        tracks,
                        trackIndex,
                        setTrackIndex,
                        setCurrentTrack,
                    }}
                />
            </div>
        </>
    );
};
export default AudioPlayer;