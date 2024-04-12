// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnLwm6IzCfyXlITdpvMBceWDfQHGZ3XIY",
  authDomain: "twitter-clon-eae34.firebaseapp.com",
  projectId: "twitter-clon-eae34",
  storageBucket: "twitter-clon-eae34.appspot.com",
  messagingSenderId: "270617974813",
  appId: "1:270617974813:web:593662650559d36bac4ef4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase auth'ın referansını alma
export const auth = getAuth(app);

//google sağlayayıcısını kurma
export const provider = new GoogleAuthProvider();

// veritabanın referansını alma
export const db = getFirestore(app);

// dosya yükleme alanının referansını alma
export const storage = getStorage(app);
