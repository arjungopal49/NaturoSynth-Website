import {useState} from "react";

const ProgressBar = ({
                         progressBarRef,
                         audioRef,
                         timeProgress,
                         duration,
                     }) => {
    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    const getBackgroundSize = () => {
        return {
            backgroundSize: `${(timeProgress * 100) / duration}% 100%`,
        };
    };

    const [timeRemaining, setTimeRemaining] = useState(false);

    const toggleEndingTime = () => {
        setTimeRemaining(!timeRemaining);
    }

    const formatTime = (time, endingTime) => {
        if (time && !isNaN(time)) {

            let minutes = Math.floor(time / 60);
            let seconds = Math.floor(time % 60);
            let formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

            if (endingTime && timeRemaining) {
                minutes = Math.floor((time - timeProgress) / 60)
                seconds = Math.floor((time - timeProgress) % 60);
                formatMinutes = minutes < 10 ? `-0${minutes}` : `${minutes}`;
            }

            const formatSeconds =
                seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
    };


    return (
        <div className="progress">
            <span className="time current">{formatTime(timeProgress, false)}</span>
            <input
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
                style={getBackgroundSize()}
            />
            <span onClick={toggleEndingTime} className="time">{formatTime(duration, true)}</span>
        </div>
    );
};

export default ProgressBar;