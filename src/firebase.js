import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgnaWDcmIonIyZ9NYH2DMphI98hPaSaFs",
    authDomain: "track-yourself-8ebbe.firebaseapp.com",
    projectId: "track-yourself-8ebbe",
    storageBucket: "track-yourself-8ebbe.appspot.com",
    messagingSenderId: "866018486958",
    appId: "1:866018486958:web:3021b17fad116453d11b3f",
    measurementId: "G-KWZFMBYF0R"
};

//We initialize the Firebase
const app = initializeApp(firebaseConfig);

//We initialize Firebase Authentication and Firestore and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
