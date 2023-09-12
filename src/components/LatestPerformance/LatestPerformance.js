import React from "react";
import './styles.css';
import mapIcon from "../../data/mapIcon.png";
import annexPic1 from "../../data/annex1-min.png";
import annexPic2 from "../../data/annex2-min.png";
import annexPic3 from "../../data/annex3-min.png";
import annexPic4 from "../../data/annex4-min.png";
import annexPic5 from "../../data/annex5-min.png";


const LatestPerformance = () => {

    return (
        <div className="latestPerformance">
            <h1> Latest Show - Headlined
                @ <a target="_blank" className="whiteLink" href="https://www.eventbrite.com/e/naturosynth-moonglow-conor-keogh-jacob-slade-tickets-686837739167?aff=oddtdtcreator">The Annex</a>
            </h1>
            <h4>
                August 11th -
                <a target="_blank" className="whiteLink" href="https://www.theredzonemadison.com/the-annex/">
                    <img className="locationIcon" src={mapIcon} alt={""}/>Madison, WI
                </a>
            </h4>
            <h5 className="latestPerformance-featuring">
                -Featuring <a target="_blank" href="https://www.instagram.com/jacob_slade_/">Jacob Slade</a>
                 , <a target="_blank" href="https://www.instagram.com/conor.keogh/">Conor</a>
                 , & <a target="_blank" href="https://www.instagram.com/moonglow_the_band/">Moonglow</a>-
            </h5>
            <div className="performance-images">
                <img className="performanceImg" src={annexPic1} alt={""}/>
                <img className="performanceImg" src={annexPic3} alt={""}/>
                <img className="performanceImg" src={annexPic4} alt={""}/>
            </div>
            <div className="performance-images">
                <img className="performanceImg" src={annexPic2} alt={""}/>
                <img className="performanceImg" src={annexPic5} alt={""}/>
            </div>
            <h5 className="latestPerformance-press">
                Press: &nbsp;&nbsp;&nbsp;
                <a target="_blank" href="https://isthmus.com/events/naturosynth-moonglow-conor-keogh-jacob-slade/">Isthumus</a>&nbsp;&nbsp;&nbsp;
                <a target="_blank" href="https://madison.com/events/naturosynth-jpg/image_acdff25a-c2b8-54be-95e4-7ab57519b78b.html">Wisconsin State Journal</a>
            </h5>
        </div>
    );
};


export default LatestPerformance;