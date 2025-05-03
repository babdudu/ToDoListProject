// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqBEJlI76VVoI3UySCco9vKY47pAtkSG8",
  authDomain: "accomplish-e993f.firebaseapp.com",
  projectId: "accomplish-e993f",
  storageBucket: "accomplish-e993f.firebasestorage.app",
  databaseURL:"https://accomplish-e993f-default-rtdb.firebaseio.com",
  messagingSenderId: "1012268759296",
  appId: "1:1012268759296:web:964940d175484932e81be5",
  measurementId: "G-JBSP1S0QHH"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
const db = getDatabase(FIREBASE_APP);
export const FIREBASE_DB = db;


