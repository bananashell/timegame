// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_APIKEY_AUTHDOMAIN,
  projectId: process.env.FIREBASE_APIKEY_PROJECTID,
  storageBucket: process.env.FIREBASE_APIKEY_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_APIKEY_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APIKEY_APPID,
  measurementId: process.env.FIREBASE_APIKEY_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const gamesCollection = collection(firestore, "games");
