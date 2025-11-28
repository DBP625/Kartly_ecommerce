import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC90BmrXQ-5MZel08ui93UYrHhIXwmsnKk",
  authDomain: "kartly-6487b.firebaseapp.com",
  projectId: "kartly-6487b",
  storageBucket: "kartly-6487b.firebasestorage.app",
  messagingSenderId: "771999966868",
  appId: "1:771999966868:web:d2cf8286f272cdcf277681",
  measurementId: "G-HW6TNP130E",
};

let firebaseApp;
let firebaseAuth;

const getFirebaseAuth = () => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = getAuth(firebaseApp);
  }
  return firebaseAuth;
};

export const auth = getFirebaseAuth();
export default firebaseApp;
