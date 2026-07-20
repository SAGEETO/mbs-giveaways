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
    ...application,
    status: "pending",
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
  // Update status
  await updateDoc(doc(db, "applications", id), {
    status,
  });

  // Get updated application
  const applicationRef = doc(db, "applications", id);
  const applicationSnap = await getDoc(applicationRef);

  if (!applicationSnap.exists()) return;

  const application = applicationSnap.data();

  // Approved notification
  if (status.toLowerCase() === "approved") {
    await sendNotification(
      application.userId,
      "✅ Application Approved",
      `Your application for "${application.giveawayTitle}" has been approved.`
    );
  }

  // Rejected notification
  if (status.toLowerCase() === "rejected") {
    await sendNotification(
      application.userId,
      "❌ Application Rejected",
      `Unfortunately, your application for "${application.giveawayTitle}" was not successful.`
    );
  }

  // Winner
  if (status.toLowerCase() === "winner") {
    // Save winner
    await addDoc(collection(db, "winners"), {
      applicationId: id,
      userId: application.userId || "",
      fullName: application.fullName || "",
      email: application.email || application.userEmail || "",
      phone: application.phone || "",
      country: application.country || "",
      giveawayId: application.giveawayId || "",
      giveawayTitle: application.giveawayTitle || "",
      prize: application.prize || "",
      image: application.image || "",
      wonAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    // Winner notification
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
export function subscribeToApplications(callback) {
  return onSnapshot(collection(db, "applications"), (snapshot) => {
    const applications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(applications);
  });
}