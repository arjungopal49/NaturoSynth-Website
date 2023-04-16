import React from "react";
import './styles.css';
import profilePic1 from '../../data/profilepic1.jpg';
import profilePic3 from '../../data/profilepic3.JPEG';
import livePic1 from '../../data/FullBandPlaying.png'
import livePic2 from '../../data/Fullbandsick3.png'
import livePic3 from '../../data/bigJunbass2.png';
import livePic4 from '../../data/JunRedBacklight.png'
import livePic5 from '../../data/PJfrontKieranBackGreen.png'
import livePic6 from '../../data/KieranGuitar.png'


const PressPhotos = () => {

    const handleClick = async (url) => {
        const originalImage = url;
        const image = await fetch(originalImage);

        //Split image name
        const nameSplit = originalImage.split("/");
        const duplicateName = nameSplit.pop();

        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
        const link = document.createElement('a')
        link.href = imageURL;
        link.download = "" + duplicateName + "";
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    };

    return (
        <div className="PressPhotos">
            <h1> Downloadable Press Photos </h1>
            <div className="epk-images">
                <img onClick={() => handleClick(profilePic1)} className="pressImg" src={profilePic1} alt={""}/>
                <img onClick={() => handleClick(profilePic3)}  className="pressImg" src={profilePic3} alt={""}/>
                <img onClick={() => handleClick(livePic1)}  className="pressImg" src={livePic1} alt={""}/>
                <img onClick={() => handleClick(livePic2)}  className="pressImg" src={livePic2} alt={""}/>
                <img onClick={() => handleClick(livePic3)}  className="pressImg" src={livePic3} alt={""}/>
                <img onClick={() => handleClick(livePic4)}  className="pressImg" src={livePic4} alt={""}/>
                <img onClick={() => handleClick(livePic5)}  className="pressImg" src={livePic5} alt={""}/>
                <img onClick={() => handleClick(livePic6)}  className="pressImg" src={livePic6} alt={""}/>

            </div>
        </div>
    );
};


export default PressPhotos;