// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "bingecue.firebaseapp.com",
  projectId: "bingecue",
  storageBucket: "bingecue.firebasestorage.app",
  messagingSenderId: "391916160298",
  appId: "1:391916160298:web:1e01d593bfb0730dbc4a53",
  measurementId: "G-1M1TFV92TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();