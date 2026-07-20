import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuLrWAQrd5bnQfH-pG9HQsILqMkzj98bM",
  authDomain: "mbs-giveaways.firebaseapp.com",
  projectId: "mbs-giveaways",
  storageBucket: "mbs-giveaways.firebasestorage.app",
  messagingSenderId: "750869541428",
  appId: "1:750869541428:web:e78353dd8102de3fc1d061",
  measurementId: "G-DCY7QVYS1V",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);