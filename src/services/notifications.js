import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

// Send notification
export async function sendNotification(userId, title, message) {
  await addDoc(collection(db, "notifications"), {
    userId,
    title,
    message,
    read: false,
    createdAt: serverTimestamp(),
  });
}

// Get user notifications
export async function getNotifications(userId) {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}