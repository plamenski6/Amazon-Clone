// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCBE3zTbni0eV4czTgun9DHl3lQrdyJjx8",
    authDomain: "clone-f828f.firebaseapp.com",
    projectId: "clone-f828f",
    storageBucket: "clone-f828f.appspot.com",
    messagingSenderId: "62373501142",
    appId: "1:62373501142:web:b8449a02e44108d5819177",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
