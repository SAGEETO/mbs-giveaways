import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export async function getDashboardStats() {
  const giveawaysSnapshot = await getDocs(collection(db, "giveaways"));
  const applicationsSnapshot = await getDocs(collection(db, "applications"));
  const usersSnapshot = await getDocs(collection(db, "users"));
  const winnersSnapshot = await getDocs(collection(db, "winners"));

  return {
    giveaways: giveawaysSnapshot.size,
    applications: applicationsSnapshot.size,
    users: usersSnapshot.size,
    winners: winnersSnapshot.size,
  };
}

export async function getApplicationsChartData() {
  const snapshot = await getDocs(collection(db, "applications"));

  const data = {};

  snapshot.forEach((doc) => {
    const app = doc.data();
    const country = app.country || "Unknown";

    data[country] = (data[country] || 0) + 1;
  });

  return Object.keys(data).map((country) => ({
    name: country,
    applications: data[country],
  }));
}