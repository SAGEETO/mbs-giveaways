import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { sendNotification } from "./notifications";

// Submit application
export async function submitApplication(application) {
  const q = query(
    collection(db, "applications"),
    where("giveawayId", "==", application.giveawayId),
    where("userId", "==", application.userId)
  );

  const existing = await getDocs(q);

  if (!existing.empty) {
    throw new Error("You have already applied for this giveaway.");
  }

  return await addDoc(collection(db, "applications"), {
    giveawayId: application.giveawayId,
    giveawayTitle: application.giveawayTitle,

    userId: application.userId,

    fullName: application.fullName,
    email: application.email,
    userEmail: application.email,

    phone: application.phone,
    country: application.country,

    prize: application.prize || "",
    image: application.image || "",

    status: "pending",

    appliedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}

// Get all applications
export async function getApplications() {
  const snapshot = await getDocs(collection(db, "applications"));

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// Update application
export async function updateApplication(id, data) {
  return await updateDoc(doc(db, "applications", id), data);
}

// Update application status
export async function updateApplicationStatus(id, status) {
  await updateDoc(doc(db, "applications", id), {
    status,
  });

  const applicationRef = doc(db, "applications", id);
  const applicationSnap = await getDoc(applicationRef);

  if (!applicationSnap.exists()) return;

  const application = applicationSnap.data();

  if (status.toLowerCase() === "approved") {
    await sendNotification(
      application.userId,
      "✅ Application Approved",
      `Your application for "${application.giveawayTitle}" has been approved.`
    );
  }

  if (status.toLowerCase() === "rejected") {
    await sendNotification(
      application.userId,
      "❌ Application Rejected",
      `Unfortunately, your application for "${application.giveawayTitle}" was not successful.`
    );
  }

  if (status.toLowerCase() === "winner") {
    await addDoc(collection(db, "winners"), {
      applicationId: id,
      userId: application.userId,

      fullName: application.fullName,
      email: application.email,
      phone: application.phone,
      country: application.country,

      giveawayId: application.giveawayId,
      giveawayTitle: application.giveawayTitle,

      prize: application.prize || "",
      image: application.image || "",

      wonAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    await sendNotification(
      application.userId,
      "🏆 Congratulations!",
      `Congratulations! You have won the "${application.giveawayTitle}" giveaway.`
    );
  }
}

// Delete application
export async function deleteApplication(id) {
  return await deleteDoc(doc(db, "applications", id));
}

// Real-time listener
export function subscribeToApplications(callback) {
  return onSnapshot(collection(db, "applications"), (snapshot) => {
    const applications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(applications);
  });
}