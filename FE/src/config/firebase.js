// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Your web app's Firebase configuration
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
const googleprovider = new GoogleAuthProvider();
const auth = getAuth();


const uploadFile = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  console.log("Uploading file:", file.name);

  const storageRef = ref(storage, `uploads/${file.name}`); // ✅ Đã sửa lỗi `ref`
  const response = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(response.ref);

  console.log("Uploaded File URL:", downloadURL); // ✅ Log URL ra console
  return downloadURL;
};

export { storage, uploadFile };