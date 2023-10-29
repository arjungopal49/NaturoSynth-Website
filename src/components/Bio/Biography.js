import React from "react";
import './styles.css';

const Biography = ({epkBioData}) => {
    return (
        <div className="epk-bio">
            <h1> Biography </h1>
            <div className="bioImgTxtDiv">
                <img className="bioImg" src={epkBioData.src} alt={""}/>
                <p className="bioTxt">
                    {epkBioData.txt}
                </p>
            </div>
        </div>
    );
};


export default Biography;