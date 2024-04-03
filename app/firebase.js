// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from  'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA0TTL5P0Qs_BXJki_yiU8agnNWeLXw8wQ",
  authDomain: "auth-development-72e77.firebaseapp.com",
  projectId: "auth-development-72e77",
  storageBucket: "auth-development-72e77.appspot.com",
  messagingSenderId: "925808122069",
  appId: "1:925808122069:web:0b935f4482cbe7c82b2a5c",
  measurementId: "G-K507Q4K1NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ;
