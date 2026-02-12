const DisplayTrack = ({
                          currentTrack,
                          audioRef,
                          setDuration,
                          progressBarRef,
                          handleNext,
                      }) => {
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    return (
        <div>
            <audio
                src={currentTrack ? require("../../data/Songs" + currentTrack.audio) : ""}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={handleNext}
            />
            <a className="title" target="_blank" rel="noreferrer" href={currentTrack ? currentTrack.link : ""}>{currentTrack ? currentTrack.title : ""}</a>
            <p className="audio-author-text">{currentTrack ? currentTrack.author : ""}</p>
        </div>
    );
};
export default DisplayTrack;