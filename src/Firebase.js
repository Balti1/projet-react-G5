// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"; // Add signInWithEmailAndPassword// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDCKYVQmLJx_1O0fm14pQS_RiVh_6i-tRA",

  authDomain: "aanber-561a9.firebaseapp.com",

  databaseURL:
    "https://aanber-561a9-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "aanber-561a9",

  storageBucket: "aanber-561a9.appspot.com",

  messagingSenderId: "126666807465",

  appId: "1:126666807465:web:7c89bc0039279de51231b8",

  measurementId: "G-R4GCQRFSBK",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
export default firebaseApp;
export { auth, database, firebaseApp, signInWithEmailAndPassword, signOut };
