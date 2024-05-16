import React from "react";
import './styles.css';
import mapIcon from "../../data/mapIcon.png";

const LatestPerformance = ({latestPerformanceData}) => {

    return (
        <div className="latestPerformance">
            <h1> Latest Show - <a target="_blank" className="whiteLink" href={latestPerformanceData.title.link}>
                {latestPerformanceData.title.text}</a>
            </h1>
            <h4>
                August 11th -
                <a target="_blank" className="whiteLink" href={latestPerformanceData.location.link}>
                    <img className="locationIcon" src={mapIcon} alt={""}/>
                    {latestPerformanceData.location.text}
                </a>
            </h4>
            <h5 className="latestPerformance-featuring">
                -Featuring&nbsp;
                {latestPerformanceData.featuring.map((artist,index)=>
                    <>
                    {index === latestPerformanceData.featuring.length-1 ?
                        <>
                            &&nbsp;
                            <a target="_blank" href={artist.link}>
                                {artist.name}
                            </a>
                        </> :
                        <>
                            <a target="_blank" href={artist.link}>
                                {artist.name}
                            </a>,&nbsp;
                        </>
                    }
                    </>
                )}-
            </h5>
            <div className="performance-images">
                {latestPerformanceData.pics.map((pic)=>
                    <img className="performanceImg" src={pic} alt={""}/>
                )}
            </div>
            <h5 className="latestPerformance-press">
                Press:
                {latestPerformanceData.press.map((press)=>
                    <>
                        &nbsp;&nbsp;&nbsp;
                        <a target="_blank" href={press.link}>{press.name}</a>
                    </>
                )}
            </h5>
        </div>
    );
};


export default LatestPerformance;