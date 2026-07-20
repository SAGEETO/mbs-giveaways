import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

// Get all giveaways
export async function getGiveaways() {
  const snapshot = await getDocs(collection(db, "giveaways"));

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// Get a single giveaway by ID
export async function getGiveaway(id) {
  const snapshot = await getDoc(doc(db, "giveaways", id));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// Create a new giveaway
export async function createGiveaway(data) {
  return await addDoc(collection(db, "giveaways"), {
    ...data,
    status: "Active",
    createdAt: serverTimestamp(),
  });
}

// Update an existing giveaway
export async function updateGiveaway(id, data) {
  return await updateDoc(doc(db, "giveaways", id), data);
}

// Delete a giveaway
export async function deleteGiveaway(id) {
  return await deleteDoc(doc(db, "giveaways", id));
}
export function subscribeToGiveaways(callback) {
  return onSnapshot(collection(db, "giveaways"), (snapshot) => {
    const giveaways = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(giveaways);
  });
}