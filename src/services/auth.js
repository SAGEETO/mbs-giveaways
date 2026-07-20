import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const register = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  // Save user to Firestore
  await setDoc(doc(db, "users", userCredential.user.uid), {
    uid: userCredential.user.uid,
    name,
    email,
    role: "user",
    createdAt: serverTimestamp(),
  });

  return userCredential;
};

export const forgotPassword = (email) =>
  sendPasswordResetEmail(auth, email);

export const logout = () => signOut(auth);