import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  doc,
  getDocs,
  getDoc,
  limit,
} from 'firebase/firestore/lite';
import { db } from '../firebase';

const EPKContext = createContext(null);

export const EPKProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [tiktoks, setTiktoks] = useState([]);
  const [press, setPress] = useState([]);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const [bio, setBio] = useState('');
  const [contact, setContact] = useState({ email: '', instagram: '' });
  const [streamingInfo, setStreamingInfo] = useState([]);
  const [tiktokInfo, setTiktokInfo] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const q = query(collection(db, 'songs'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((d) => d.data());
        setSongs(
          data
            .filter((song) => song.rank >= 1 && song.rank <= 10)
            .sort((a, b) => a.rank - b.rank),
        );
      } catch (e) {
        console.error('fetchSongs error', e);
      }
    };

    const fetchTiktoks = async () => {
      try {
        const q = query(collection(db, 'tiktoks'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((d) => d.data());
        setTiktoks(
          data
            .filter((tt) => tt.rank >= 1 && tt.rank <= 10)
            .sort((a, b) => a.rank - b.rank),
        );
      } catch (e) {
        console.error('fetchTiktoks error', e);
      }
    };

    const fetchPress = async () => {
      try {
        const q = query(collection(db, 'press'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((d) => d.data());
        setPress(data);
      } catch (e) {
        console.error('fetchPress error', e);
      }
    };

    const fetchShows = async () => {
      try {
        const q = query(collection(db, 'shows'), orderBy('date', 'desc'), limit(8));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((d) => d.data());
        setShows(data);
        if (data.length > 0) setSelectedShow(data[0]);
      } catch (e) {
        console.error('fetchShows error', e);
      }
    };

    const fetchEpkData = async () => {
      try {
        let ref = doc(db, 'epk', 'bio');
        let snapshot = await getDoc(ref);
        setBio(snapshot.data()?.bio || '');

        ref = doc(db, 'epk', 'contact');
        snapshot = await getDoc(ref);
        setContact(snapshot.data() || { email: '', instagram: '' });

        ref = doc(db, 'epk', 'streamingInfo');
        snapshot = await getDoc(ref);
        setStreamingInfo(snapshot.data()?.info || []);

        ref = doc(db, 'epk', 'tiktokInfo');
        snapshot = await getDoc(ref);
        setTiktokInfo(snapshot.data()?.info || []);
      } catch (e) {
        console.error('fetchEpkData error', e);
      }
    };

    fetchSongs();
    fetchTiktoks();
    fetchPress();
    fetchShows();
    fetchEpkData();
  }, []);

  const value = {
    songs,
    tiktoks,
    press,
    shows,
    selectedShow,
    setSelectedShow,
    bio,
    contact,
    streamingInfo,
    tiktokInfo,
  };

  return <EPKContext.Provider value={value}>{children}</EPKContext.Provider>;
};

export const useEPK = () => {
  const ctx = useContext(EPKContext);
  if (!ctx) throw new Error('useEPK must be used within an EPKProvider');
  return ctx;
};

export default EPKContext;
