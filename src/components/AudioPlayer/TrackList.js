import React from "react";



const TrackList = ({
                       tracks,
                       trackIndex,
                       setTrackIndex,
                       setCurrentTrack,
                   }) => {

    const handleSeek = (index) => {
        setTrackIndex(index);
        setCurrentTrack(tracks[index]);
    }

    return (
        <>
            {
                tracks.map((value, index) => (
                        <div className= {"songsList" + (index === trackIndex ? '-active' : '')}
                             key={index}
                             onClick={() => handleSeek(index)}>
                            <p className="songsListNumber">{index+1 + ""}</p>
                            <img src={value.thumbnail} alt="audio avatar" />
                            <p className="">{value.title}</p>

                        </div>
                    )
                )
            }
        </>
    );
};

export default TrackList;