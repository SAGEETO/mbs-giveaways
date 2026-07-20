import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";
import Navbar from "../components/Navbar";

function MyApplications() {
  const [applications, setApplications] =useState([]);

  useEffect(() => {
    async function fetchApplications() {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const q = query(
          collection(db, "applications"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        const applicationData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplications(applicationData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchApplications();
  }, []);

  const statusStyle = (status) => {
    switch ((status || "").toLowerCase()) {
      case "winner":
        return "bg-green-100 text-green-700";

      case "approved":
        return "bg-blue-100 text-blue-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 pt-28 pb-10 px-4 sm:px-6">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-8">
            My Applications
          </h1>

          {applications.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

              <h2 className="text-2xl font-bold text-green-700">
                No Applications Yet
              </h2>

              <p className="text-gray-500 mt-3">
                You haven't applied for any giveaway yet.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {applications.map((application) => (

                <div
                  key={application.id}
                  className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition"
                >

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                    <h2 className="text-2xl font-bold text-green-700 break-words">
                      {application.giveawayTitle}
                    </h2>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold text-center ${statusStyle(
                        application.status
                      )}`}
                    >
                      {application.status || "Pending"}
                    </span>

                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">

                    <p>
                      <strong>Name:</strong><br />
                      {application.fullName || "-"}
                    </p>

                    <p>
                      <strong>Email:</strong><br />
                      {application.userEmail || application.email || "-"}
                    </p>

                    <p>
                      <strong>Phone:</strong><br />
                      {application.phone || "-"}
                    </p>

                    <p>
                      <strong>Country:</strong><br />
                      {application.country || "-"}
                    </p>

                    <p>
                      <strong>Status:</strong><br />
                      {application.status || "Pending"}
                    </p>

                    <p>
                      <strong>Applied:</strong><br />
                      {application.appliedAt?.toDate
                        ? application.appliedAt
                            .toDate()
                            .toLocaleDateString()
                        : "Recently"}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </>
  );
}

export default MyApplications;