import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyBWbJcuGLjaqVMYt5w1GhZoeJaSpdey9xk",
  authDomain: "login-auth-49328.firebaseapp.com",
  projectId: "login-auth-49328",
  storageBucket: "login-auth-49328.firebasestorage.app",
  messagingSenderId: "175942914360",
  appId: "1:175942914360:web:7610759cbcb8ae44a5f1cd"
};
const authApp = initializeApp(firebaseConfig, "authApp");
const auth = getAuth(authApp);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
