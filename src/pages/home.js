import React from "react";
import SocialLogos from "../components/Socials/SocialLogos";
import HeadphonesHeader from "../components/HeadphonesHeader/HeadphonesHeader";

const Home = () => {
    return (
        <div className='Background'>
        <div className="home-full">
            <HeadphonesHeader/>
            <SocialLogos/>
        </div>
        </div>
    );
};

export default Home;
