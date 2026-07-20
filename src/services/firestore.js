import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

// USERS
export const createUserProfile = async (user) => {
  return addDoc(collection(db, "users"), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    createdAt: serverTimestamp(),
  });
};

// GIVEAWAYS
export const getGiveaways = async () => {
  const snapshot = await getDocs(collection(db, "giveaways"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// USER PROFILE
export const getUserProfile = async (id) => {
  const snapshot = await getDoc(doc(db, "users", id));

  return snapshot.data();
};