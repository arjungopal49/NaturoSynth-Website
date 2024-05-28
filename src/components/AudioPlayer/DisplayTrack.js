
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
            <a className="title" target="_blank" href={currentTrack.link}>{currentTrack.title}</a>
            <p className="audio-author-text">{currentTrack.author}</p>
        </div>
    );
};
export default DisplayTrack;