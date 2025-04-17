import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCmlzjT2wILBAo6GiUMC5muiP1JC7hqrs",
    authDomain: "expense-tracker-11e95.firebaseapp.com",
    projectId: "expense-tracker-11e95",
    storageBucket: "expense-tracker-11e95.firebasestorage.app",
    messagingSenderId: "149567045875",
    appId: "1:149567045875:web:d58666b1bda86c4721f786",
    measurementId: "G-STP3WT2045"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);