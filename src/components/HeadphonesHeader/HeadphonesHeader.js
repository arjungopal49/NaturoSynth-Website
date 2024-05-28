import React from "react";
import head from '../../data/Songs/Cover Arts/headphones-on-art.jpg';
import './styles.css';

const HeadphonesHeader = () => {
    return (
        <div className="Container">
            <div className="Photo">
                <img className="Img" src={head} alt="" />
            </div>
            <a href="https://unitedmasters.com/m/64f208de782505c2d52dd391" className="Button" target="_blank">
                Click to stream Headphones On
            </a>
        </div>
    );
};

export default HeadphonesHeader;
