import React, {useState, useEffect} from "react";
import './styles.css';
import { db } from '../../firebase';
import { collection, getDocs} from 'firebase/firestore/lite';


const ShowsList = () => {
    const [shows, setShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);

    const openModal = (show) => {
        setSelectedShow(show);
    };

    const closeModal = () => {
        setSelectedShow(null);
    };

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
          
        const showsOrdered = showsList.sort((a, b) => b.date.toDate() - a.date.toDate());
        setShows(showsOrdered.slice(0, 8));
        } catch (error) {
          console.error("Error fetching shows:", error);
        }
    };

    return (
        <div className="showsList-Container">
            <h1>
                Past Shows
            </h1>
            {shows.length > 0 ? (
                <div className="">
                    {shows.map((show, index) => (
                        <div 
                            key={index} 
                            className="showsList"
                            onClick={() => openModal(show)}
                        >
                            <p className="showsList-text">
                                {show.date.toDate().toLocaleDateString()}: {show.location} - {show.venue}
                            </p>
                            {(show.sold && show.sold !== "") && (
                                <p className="showsList-sold">
                                    {"("}{show.sold}{")"}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No shows available.</p>
            )}

            {/* Modal */}
            {/* {selectedShow && (
                <div className="">
                    <div className="">
                        <button 
                            className=""
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedShow.title}</h2>
                        
                        {selectedShow.pictures.length > 0 ? (
                            <div>
                                {selectedShow.pictures.map((src, i) => (
                                                <img className="performanceImg" src={require(`../../data/Pictures/Performances${src}`)}  alt={""} />
                                            ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No images available.</p>
                        )}
                    </div>
                </div>
            )} */}
        </div>
    );
};


export default ShowsList;