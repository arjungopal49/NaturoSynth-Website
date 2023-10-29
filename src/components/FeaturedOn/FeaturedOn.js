import React from "react";
import './styles.css';
import {SocialIcon} from "react-social-icons";

const FeaturedOn = ({featuredOnData}) => {
    const getIcon = (name) => {
        if (name.toString().toLowerCase() === "radio") return "itunes";
        return name.toString().toLowerCase();
    }
    return (
        <div className="featuredOn">
            <h1> Featured On </h1>
            <div className="bulletList">
                {featuredOnData.items.map((feature)=>
                    <p className="featuredOnTxt">
                        <SocialIcon className="iconBulletPoint" url={feature.link} network={getIcon(feature.icon)} target="_blank"/>
                        <a href={feature.link} target="_blank">{feature.description}</a>
                    </p>
                )}
            </div>
        </div>
    );
};


export default FeaturedOn;