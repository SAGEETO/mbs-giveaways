import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Bell } from "lucide-react";

import Navbar from "../components/Navbar";
import { getNotifications } from "../services/notifications";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getNotifications(user.uid);
        setNotifications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">
            Loading Notifications...
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 pt-32 pb-16 px-6">

        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-4 mb-10">

            <div className="bg-yellow-400 p-4 rounded-2xl">
              <Bell size={32} className="text-green-900" />
            </div>

            <div>
              <h1 className="text-4xl font-black text-white">
                Notifications
              </h1>

              <p className="text-green-100 mt-1">
                Stay updated with your giveaway activities.
              </p>
            </div>

          </div>

          <div className="space-y-5">

          {notifications.length === 0 ? (

              <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

                <Bell
                  size={60}
                  className="mx-auto text-yellow-500 mb-5"
                />

                <h2 className="text-2xl font-bold text-green-800">
                  No Notifications
                </h2>

                <p className="text-gray-500 mt-3">
                  You don't have any notifications yet.
                </p>

              </div>

            ) : (

              notifications.map((notification) => (

                <div
                  key={notification.id}
                  className={`rounded-2xl shadow-lg p-6 transition ${
                    notification.read
                      ? "bg-white"
                      : "bg-yellow-50 border-l-4 border-yellow-500"
                  }`}
                >

                  <div className="flex items-start justify-between">

                    <div>

                      <h2 className="text-xl font-bold text-green-800">
                        {notification.title}
                      </h2>

                      <p className="text-gray-600 mt-2">
                        {notification.message}
                      </p>

                    </div>

                    {!notification.read && (
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        NEW
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-gray-400 mt-4">
                    {notification.createdAt?.toDate
                      ? notification.createdAt.toDate().toLocaleString()
                      : "Just now"}
                  </p>

                </div>

              ))

            )}
            </div>

        </div>

      </div>
    </>
  );
}

export default Notifications;