import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

// Create a winner
export async function addWinner(data) {
  return await addDoc(collection(db, "winners"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

// Get all winners
export async function getWinners() {
  const snapshot = await getDocs(collection(db, "winners"));

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// Delete winner
export async function deleteWinner(id) {
  return await deleteDoc(doc(db, "winners", id));
}