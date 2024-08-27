import React from "react";
import { getCollection, getCollectionList } from "../firebase";
import { useState, useEffect } from "react";

const Merch = () => {
    // const [songs, setSongs] = useState([]);

    // useEffect(() =>{ 
    //     const getSongs = async() => {
    //         const s = await getCollectionList("songs");
    //         setSongs(s);
    //     }
    //     getSongs()
    // },[])


    // console.log(songs);
// 192.168.1.105
    return ( 
        <div className="merch-full">
            <h1>
                New shirts coming soon!
            </h1>
            {/* {songs.map((song)=>
                    <p> {song.title} </p>
                )} */}
        </div>
    );
};

export default Merch;
