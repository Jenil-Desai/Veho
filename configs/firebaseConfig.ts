import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASdpBJb0MO4C8jKqgt_O_7Sn6KTTezxvg",
  authDomain: "veho-6f187.firebaseapp.com",
  projectId: "veho-6f187",
  storageBucket: "veho-6f187.firebasestorage.app",
  messagingSenderId: "897977772467",
  appId: "1:897977772467:web:1a0d0390414b7f26dd43c6",
  measurementId: "G-C24NKX2C78",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
