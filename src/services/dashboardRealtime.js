import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export function subscribeToDashboardStats(callback) {
  const unsubscribers = [];

  const stats = {
    giveaways: 0,
    applications: 0,
    users: 0,
    winners: 0,
  };

  function notify() {
    callback({ ...stats });
  }

  unsubscribers.push(
    onSnapshot(collection(db, "giveaways"), (snapshot) => {
      stats.giveaways = snapshot.size;
      notify();
    })
  );

  unsubscribers.push(
    onSnapshot(collection(db, "applications"), (snapshot) => {
      stats.applications = snapshot.size;
      notify();
    })
  );

  unsubscribers.push(
    onSnapshot(collection(db, "users"), (snapshot) => {
      stats.users = snapshot.size;
      notify();
    })
  );

  unsubscribers.push(
    onSnapshot(collection(db, "winners"), (snapshot) => {
      stats.winners = snapshot.size;
      notify();
    })
  );

  return () => {
    unsubscribers.forEach((unsubscribe) => unsubscribe());
  };
}