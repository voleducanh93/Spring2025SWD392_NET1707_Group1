// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOu1-3hf6KqyE2m0uwYR9UdJVT4oXss0g",
  authDomain: "petspa-0808.firebaseapp.com",
  projectId: "petspa-0808",
  storageBucket: "petspa-0808.appspot.com",
  messagingSenderId: "859604457940",
  appId: "1:859604457940:web:37f93ac30802b104f85e41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export { storage, googleProvider, auth };
