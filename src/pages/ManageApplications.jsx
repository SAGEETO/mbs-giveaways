import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  subscribeToApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../services/applications";

import { addWinner } from "../services/winners";

function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  async function loadApplications() {
    const data = await getApplications();
    setApplications(data);
  }

  useEffect(() => {
  const unsubscribe = subscribeToApplications((data) => {
    setApplications(data);
  });

  return () => unsubscribe();
}, []);

  async function changeStatus(id, status) {
  await updateApplicationStatus(id, status);
}

async function removeApplication(id) {
  if (!window.confirm("Delete this application?")) return;

  await deleteApplication(id);
}

  async function makeWinner(app) {
    try {
      await addWinner({
  applicationId: app.id,
  winnerName: app.fullName || "",
  winnerEmail: app.userEmail || "",
  phone: app.phone || "",
  country: app.country || "",
  giveawayId: app.giveawayId || "",
  giveawayTitle: app.giveawayTitle || "",
  prize: app.prize || "",
  image: app.image || "",
  status: "Winner",
});

      await updateApplicationStatus(app.id, "winner");

      alert("🎉 Winner selected successfully!");

      loadApplications();
    }
     catch (error) {
      console.error(error);
      alert("Failed to create winner.");
    }
  }

  async function removeApplication(id) {
    if (!window.confirm("Delete this application?")) return;

    await deleteApplication(id);
    loadApplications();
  }

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        (app.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
        (app.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (app.giveawayTitle || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (app.status || "").toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const badgeColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return "bg-blue-100 text-blue-700";
      case "winner":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Manage Applications
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search name, email or giveaway..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-xl p-3"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl p-3"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="winner">Winner</option>
            <option value="rejected">Rejected</option>
          </select>

        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Giveaway</th>
                <th className="p-4 text-left">Country</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredApplications.map((app) => (

                <tr
                  key={app.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">{app.fullName}</td>

                  <td className="p-4">{app.giveawayTitle}</td>

                  <td className="p-4">{app.country}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${badgeColor(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="p-4">

                    <div className="flex flex-wrap gap-2">

                      <button
                        onClick={() => changeStatus(app.id, "approved")}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => changeStatus(app.id, "rejected")}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => makeWinner(app)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg"
                      >
                        Make Winner
                      </button>

                      <button
                        onClick={() => removeApplication(app.id)}
                        className="bg-gray-800 text-white px-3 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>
    </div>
  );
}

export default ManageApplications;