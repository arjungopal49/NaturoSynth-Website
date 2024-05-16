import React from "react";
import profilePic1 from '../../data/profilepic2.JPG'
import './styles.css';

const Biography = ({bio}) => {
    return (
        <div className="epk-bio">
            <h1> Biography </h1>
            <div className="bioImgTxtDiv">
                <img className="bioImg" src={profilePic1} alt={""}/>
                <p className="bioTxt">
                    {bio}
                </p>
            </div>
        </div>
    );
};


export default Biography;