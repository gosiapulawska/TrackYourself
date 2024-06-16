import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBgnaWDcmIonIyZ9NYH2DMphI98hPaSaFs",
    authDomain: "track-yourself-8ebbe.firebaseapp.com",
    projectId: "track-yourself-8ebbe",
    storageBucket: "track-yourself-8ebbe.appspot.com",
    messagingSenderId: "866018486958",
    appId: "1:866018486958:web:3021b17fad116453d11b3f",
    measurementId: "G-KWZFMBYF0R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;

