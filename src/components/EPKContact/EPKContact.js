import React from "react";
import './styles.css';


const EPKContact = () => {
    return (
        <div className="EPKContact">
            <h1> Contact Information </h1>
            <div className="contactText">
                <p> {"Email us at "}
                    <a href="mailto: naturosynth@gmail.com" target="_blank" rel="noreferrer">naturosynth@gmail.com</a>
                    {" or DM us on Instagram: "}
                    <a href="https://www.instagram.com/naturosynth/" target="_blank" rel="noreferrer">@naturosynth</a>
                </p>
            </div>
        </div>
    );
};


export default EPKContact;