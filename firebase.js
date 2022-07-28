// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7iA1FmwXqR2Nn0_JkvqrvXKow6iISQUY",
  authDomain: "athelasapp.firebaseapp.com",
  projectId: "athelasapp",
  storageBucket: "athelasapp.appspot.com",
  messagingSenderId: "413639365500",
  appId: "1:413639365500:web:a4facf772bd6a79b008af9",
  measurementId: "G-RCLF5MW6J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);