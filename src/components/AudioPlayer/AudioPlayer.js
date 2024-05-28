import { useRef, useState } from 'react';

// import components
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import TrackList from './TrackList';
// import TopBar from './TopBar';
import './styles.css';
import React from 'react';
const AudioPlayer = ({tracks}) => {
    // states
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(
        tracks[trackIndex]
    );
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    // reference
    const audioRef = useRef();
    const progressBarRef = useRef();

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
                            <a target="_blank" href={currentTrack.link}>
                                <img src={currentTrack.thumbnail} alt="audio avatar" />
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