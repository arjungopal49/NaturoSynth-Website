import React from "react";
import './styles.css';
import {SocialIcon} from "react-social-icons";

const FeaturedOn = () => {
    return (
        <div className="featuredOn">
            <h1> Featured On </h1>
            <div className="bulletList">
                <p className="featuredOnTxt">
                    <SocialIcon className="iconBulletPoint" url={"https://open.spotify.com/playlist/0qYAqOsMGJPntjVEKV5WOF"} target="_blank"/>
                    <a href="https://open.spotify.com/playlist/0qYAqOsMGJPntjVEKV5WOF" target="_blank">Playlist: Indie Rock (>44K followers) [2023]</a>
                </p>
                <p className="featuredOnTxt">
                    <SocialIcon className="iconBulletPoint" url={"https://open.spotify.com/playlist/33g9HtxlX4TuqbGAZMnzuF"} target="_blank"/>
                    <a href="https://open.spotify.com/playlist/33g9HtxlX4TuqbGAZMnzuF" target="_blank">Playlist: South Asian Indie (>6K followers) [2023]</a>
                </p>
                <p className="featuredOnTxt">
                    <SocialIcon className="iconBulletPoint" url={"https://drive.google.com/file/d/1wVUUBo4I2DvUhbtmlO1C8JK__hO7pnot/view"} network={"itunes"} target="_blank"/>
                    <a href="https://drive.google.com/file/d/1wVUUBo4I2DvUhbtmlO1C8JK__hO7pnot/view" target="_blank">Radio: Rukus Avenue Radio (>9M monthly listeners) [2021]</a>
                </p>
                <p className="featuredOnTxt">
                    <SocialIcon className="iconBulletPoint" url={"https://www.youtube.com/watch?v=7e4uVfJv4yw&t=1152s"} target="_blank"/>
                    <a href="https://www.youtube.com/watch?v=7e4uVfJv4yw&t=1152s" target="_blank">Channel: Terminal Passage (>350K subscribers) [2021]</a>
                </p>
            </div>
        </div>
    );
};


export default FeaturedOn;