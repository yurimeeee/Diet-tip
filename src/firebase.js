// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoAMaHsf3teLNpUdXygbN6C50LYEvvFeg",
  authDomain: "ditetip.firebaseapp.com",
  projectId: "ditetip",
  storageBucket: "ditetip.appspot.com",
  messagingSenderId: "577940528112",
  appId: "1:577940528112:web:30443d932237d3117d5b35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;

export const db = getFirestore(app);
export const storage = getStorage(app);
