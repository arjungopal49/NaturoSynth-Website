// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7SeMYwAfE-kzhobkD6RqL7_0aD3ROIPo",
    authDomain: "naturosynth-website.firebaseapp.com",
    projectId: "naturosynth-website",
    storageBucket: "naturosynth-website.appspot.com",
    messagingSenderId: "23659764788",
    appId: "1:23659764788:web:d41116375871d962bbfe61",
    measurementId: "G-FKJ7TXEH0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);