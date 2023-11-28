// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFm0eYWg5so8Wcw-GeYEby2lQZPPYravk",
  authDomain: "mern-real-estate-28553.firebaseapp.com",
  projectId: "mern-real-estate-28553",
  storageBucket: "mern-real-estate-28553.appspot.com",
  messagingSenderId: "699234644578",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
