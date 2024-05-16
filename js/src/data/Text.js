import React from "react";
import { useState } from "react";
import {useEffect} from "react";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import {db} from './firebase';

const Text = () => {
    const [epkData, setEPKData] = useState([]);

    const fetchPost = async () => {

        await getDocs(collection(db, "epk"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setEPKData(newData);
                console.log(epkData, newData);
            })

    }

    useEffect(() => {
        fetchPost();
    }, [])

    return (
        <>
            A
        </>
    )
}

export default Text