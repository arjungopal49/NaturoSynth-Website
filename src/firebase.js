// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {collection, getDocs, getFirestore, addDoc, deleteDoc, doc} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi8hqYz2FqEzYfxfC9SoWtGEUqf-eqnqA",
  authDomain: "naturosynth-backend.firebaseapp.com",
  databaseURL: "https://naturosynth-backend-default-rtdb.firebaseio.com",
  projectId: "naturosynth-backend",
  storageBucket: "naturosynth-backend.appspot.com",
  messagingSenderId: "105111682761",
  appId: "1:105111682761:web:d537c1246c1f0e0efb5718",
  measurementId: "G-JM7F50S1FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export async function getCollection(collectionName) {
  const collectionReference = collection(db, collectionName);
  const snapshot = await getDocs(collectionReference);
  return snapshot.docs.map(doc => doc.data());
}

export async function addToCollection(collectionName, data) {
  // Add a new document with a generated id.
  const myCollection = collection(db, collectionName);
  await addDoc(myCollection, data);
}

export async function removeCollection(collectionName) {
  let Ids = []
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
      Ids.push(doc.id)
  });
  for (let i = 0; i < Ids.length; i++) {
      await deleteDoc(doc(db, collectionName, Ids[i]));
  }
  let check = await getCollection(collectionName)
  do{
      await sleep(100)
  }while (check.length > 0)
}

export async function getCollectionList(collectionName) {
  const collectionReference = collection(db, collectionName);
  const snapshot = await getDocs(collectionReference);
  const list = [];
  snapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    list.push(doc.data());
  });
  return list;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}