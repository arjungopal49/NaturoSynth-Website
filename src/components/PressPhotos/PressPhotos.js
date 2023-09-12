import React from "react";
import './styles.css';
import profilePic1 from '../../data/profilepic1.jpg';
import profilePic2 from '../../data/profilepic2.JPG';
import profilePic3 from '../../data/profilepic3.JPEG';
import livePic1 from '../../data/FullBandPlaying.png'
import livePic2 from '../../data/Fullbandsick3.png'
import livePic3 from '../../data/bigJunbass2.png';
import livePic4 from '../../data/JunRedBacklight.png'
import livePic5 from '../../data/PJfrontKieranBackGreen.png'
import livePic6 from '../../data/KieranGuitar.png'
import livePic1LowRes from '../../data/FullBandPlayingLowRes.png'
import livePic2LowRes from '../../data/Fullbandsick3LowRes.png'
import livePic3LowRes from '../../data/bigJunbassLowRes.png'
import livePic4LowRes from '../../data/JunRedBacklightLowRes.png'
import livePic5LowRes from '../../data/PJfrontKieranBackGreenLowRes.png'
import livePic6LowRes from '../../data/KieranGuitarLowRes.png'
import profilePic4 from '../../data/KieranOnWall.png'
import profilePic5 from '../../data/ByWater.png'


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
            <p> (Click to Download)</p>
            <div className="epk-images">
                <img onClick={() => handleClick(livePic1)}  className="pressImg" src={livePic1LowRes} alt={""}/>
                <img onClick={() => handleClick(profilePic3)}  className="pressImg" src={profilePic3} alt={""}/>
                <img onClick={() => handleClick(livePic2)}  className="pressImg" src={livePic2LowRes} alt={""}/>
                <img onClick={() => handleClick(livePic3)}  className="pressImg" src={livePic3LowRes} alt={""}/>
                <img onClick={() => handleClick(livePic5)}  className="pressImg" src={livePic5LowRes} alt={""}/>
                <img onClick={() => handleClick(livePic6)}  className="pressImg" src={livePic6LowRes} alt={""}/>
                <img onClick={() => handleClick(profilePic1)} className="pressImg1" src={profilePic1} alt={""}/>
                <img onClick={() => handleClick(profilePic2)} className="pressImg" src={profilePic2} alt={""}/>
                <img onClick={() => handleClick(livePic4)}  className="pressImg4" src={livePic4LowRes} alt={""}/>
                {/*<img onClick={() => handleClick(profilePic4)} className="pressImg" src={profilePic4} alt={""}/>*/}
                {/*<img onClick={() => handleClick(profilePic5)} className="pressImg" src={profilePic5} alt={""}/>*/}
                
            </div>
        </div>
    );
};


export default PressPhotos;