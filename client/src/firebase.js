// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-28553.firebaseapp.com",
  projectId: "mern-real-estate-28553",
  storageBucket: "mern-real-estate-28553.appspot.com",
  messagingSenderId: "699234644578",
  appId: "1:699234644578:web:8e347e26aa923c338dd73b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
