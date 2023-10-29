
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
                src={currentTrack.src}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={handleNext}
            />
            <p className="title">{currentTrack.title}</p>
            <p className="audio-author-text">{currentTrack.author}</p>
        </div>
    );
};
export default DisplayTrack;