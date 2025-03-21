import React, {useState, useEffect} from "react";
import './styles.css';
import mapIcon from "../../data/Pictures/Icons/mapIcon.png";
import { db } from '../../firebase';
import { collection, getDocs} from 'firebase/firestore/lite';


const LatestPerformance = () => {
    const [show, setShow] = useState(null);
    useEffect(() => {
        fetchShows();
    }, []);
    
    const fetchShows = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "shows"));
          const showsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          
        const latestShow = showsList
            .filter(show => show.date)
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        
        setShow(latestShow);
        console.log(latestShow);
        } catch (error) {
          console.error("Error fetching shows:", error);
        }
    };

    return (
        <div className="latestPerformance">
            <h1> Latest Show - <a target="_blank" className="whiteLink" href={show ? show.ticketLink : ""}>
                {show ? show.title : ""}</a>
            </h1>
            <h4>
                {show ? show.date.toDate().toLocaleDateString() : ""} -
                <a target="_blank" className="whiteLink" href={show ? show.ticketLink : ""}>
                    <img className="locationIcon" src={mapIcon} alt={""}/>
                    {show ? show.location : ""}
                </a>
            </h4>
            <h5 className="latestPerformance-featuring">
                
                -Featuring&nbsp;
                {show && show.featuring.map((artist,index)=>
                    <>
                    {index === show.featuring.length-1 ?
                        <>
                            &&nbsp;
                            <a target="_blank" href={artist.link}>
                                {artist.name}
                            </a>
                        </> :
                        <>
                            <a target="_blank" href={artist.link}>
                                {artist.name}
                            </a>,&nbsp;
                        </>
                    }
                    </>
                )}-
            </h5>
            <div className="performance-images">
                {show && show.pictures.map((pic)=>
                    <img className="performanceImg" src={require(`../../data/Pictures/Performances${pic}`)}  alt={""} />
                )}
            </div>
            <h5 className="latestPerformance-press">
                {(show && show.press.length > 0) && <>Press:</>}
                {show && show.press.map((press)=>
                    <>
                        &nbsp;&nbsp;&nbsp;
                        <a target="_blank" href={press.link}>{press.name}</a>
                    </>
                )}
            </h5>
        </div>
    );
};


export default LatestPerformance;