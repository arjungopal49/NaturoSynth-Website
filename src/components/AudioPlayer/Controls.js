import { useState, useEffect, useRef, useCallback } from 'react';

// icons
import {
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from 'react-icons/io5';

const Controls = ({
                      audioRef,
                      progressBarRef,
                      duration,
                      setTimeProgress,
                      tracks,
                      trackIndex,
                      setTrackIndex,
                      setCurrentTrack,
                      handleNext,
                  }) => {
    const [isPlaying, setIsPlaying] = useState(false);
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
// eslint-disable-next-line no-unused-vars
    }, [isPlaying, audioRef, repeat]);

    const skipForward = () => {
// eslint-disable-next-line no-unused-vars
        audioRef.current.currentTime += 15;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 15;
    };

    const handlePrevious = () => {
        if (trackIndex === 0) {
            let lastTrackIndex = tracks.length - 1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(tracks[lastTrackIndex]);
        } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1]);
        }
    };

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume]);

    return (
        <div className="controls-wrapper">
            <div className="controls">
                <button onClick={handlePrevious}>
                    <IoPlaySkipBackSharp />
                </button>
                {/*<button onClick={skipBackward}>*/}
                {/*    <IoPlayBackSharp />*/}
                {/*</button>*/}

                <button onClick={togglePlayPause}>
                    {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                </button>
                {/*<button onClick={skipForward}>*/}
                {/*    <IoPlayForwardSharp />*/}
                {/*</button>*/}
                <button onClick={handleNext}>
                    <IoPlaySkipForwardSharp />
                </button>
            </div>

        </div>
    );
};

export default Controls;