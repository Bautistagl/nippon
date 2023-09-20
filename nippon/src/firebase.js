
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDX4KcVEhyJIN8ze2blrguptGCF8ov7dew",
    authDomain: "nippon-96907.firebaseapp.com",
    databaseURL: "https://nippon-96907-default-rtdb.firebaseio.com",
    projectId: "nippon-96907",
    storageBucket: "nippon-96907.appspot.com",
    messagingSenderId: "827062312507",
    appId: "1:827062312507:web:82784b21145f09f334c61e",
    measurementId: "G-6SFDX06PGN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app)


export { db,auth,app };