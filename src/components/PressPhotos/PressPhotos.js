import React from "react";
import './styles.css';

const PressPhotos = ({pressPhotosData}) => {

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
                {pressPhotosData.map((currentPhoto)=>
                    <img onClick={() => handleClick(currentPhoto)}  className="pressImg"
                         src={currentPhoto} alt={""}/>
                )}
            </div>
        </div>
    );
};


export default PressPhotos;