import { useEffect, useState } from "react";
import {
  Gift,
  Users,
  FileText,
  Trophy,
  PlusCircle,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import DashboardCharts from "../components/charts/DashboardCharts";
import { subscribeToDashboardStats } from "../services/dashboardRealtime";

function AdminDashboard() {
  const [stats, setStats] = useState({
    giveaways: 0,
    applications: 0,
    users: 0,
    winners: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToDashboardStats((data) => {
      setStats(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />

        <main className="flex-1 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-green-700">
            Loading Dashboard...
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-black text-green-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back. Here's an overview of your giveaway platform.
            </p>

          </div>

          <Link
            to="/admin/create-giveaway"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            <PlusCircle size={20} />
            New Giveaway
          </Link>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">

        {/* Giveaways Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <Gift className="text-green-700 mb-4" size={35} />

            <p className="text-gray-500">
              Giveaways
            </p>

            <h2 className="text-4xl font-black mt-2">
              {stats.giveaways}
            </h2>

            <p className="text-green-600 text-sm font-semibold mt-2">
              ● Live
            </p>

          </div>

          {/* Applications Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FileText className="text-blue-700 mb-4" size={35} />

            <p className="text-gray-500">
              Applications
            </p>

            <h2 className="text-4xl font-black mt-2">
              {stats.applications}
            </h2>

            <p className="text-green-600 text-sm font-semibold mt-2">
              ● Live
            </p>

          </div>

          {/* Users Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <Users className="text-purple-700 mb-4" size={35} />

            <p className="text-gray-500">
              Users
            </p>

            <h2 className="text-4xl font-black mt-2">
              {stats.users}
            </h2>

            <p className="text-green-600 text-sm font-semibold mt-2">
              ● Live
            </p>

          </div>

          {/* Winners Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <Trophy className="text-yellow-500 mb-4" size={35} />

            <p className="text-gray-500">
              Winners
            </p>

            <h2 className="text-4xl font-black mt-2">
              {stats.winners}
            </h2>

            <p className="text-green-600 text-sm font-semibold mt-2">
              ● Live
            </p>

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">

        {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="space-y-4">

              <Link
                to="/admin/create-giveaway"
                className="block bg-green-700 text-white p-4 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                ➕ Create New Giveaway
              </Link>

              <Link
                to="/admin/giveaways"
                className="block bg-purple-700 text-white p-4 rounded-xl font-semibold hover:bg-purple-800 transition"
              >
                🎁 Manage Giveaways
              </Link>

              <Link
                to="/admin/manage-applications"
                className="block bg-blue-700 text-white p-4 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                📄 Manage Applications
              </Link>

              <Link
                to="/admin/settings"
                className="block bg-gray-800 text-white p-4 rounded-xl font-semibold hover:bg-black transition"
              >
                ⚙️ Admin Settings
              </Link>

              <Link
                to="/"
                className="block bg-yellow-500 text-white p-4 rounded-xl font-semibold hover:bg-yellow-600 transition"
              >
                <div className="flex items-center gap-2">
                  <Eye size={18} />
                  View Website
                </div>
              </Link>

            </div>

          </div>
          {/* Platform Status */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Platform Status
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-700">🔥 Firebase</span>
                <span className="text-green-600 font-bold">
                  Connected
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-700">🔐 Authentication</span>
                <span className="text-green-600 font-bold">
                  Active
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-700">🗄 Firestore</span>
                <span className="text-green-600 font-bold">
                  Online
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-700">📂 Storage</span>
                <span className="text-green-600 font-bold">
                  Ready
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">⚡ Live Updates</span>
                <span className="text-green-600 font-bold">
                  Enabled
                </span>
              </div>

            </div>

          </div>

        </div>
        {/* Dashboard Charts */}
        <DashboardCharts stats={stats} />

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Platform Summary
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="text-green-700 font-bold text-lg">
                Total Giveaways
              </h3>

              <p className="text-3xl font-black text-green-900 mt-3">
                {stats.giveaways}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="text-blue-700 font-bold text-lg">
                Applications
              </h3>

              <p className="text-3xl font-black text-blue-900 mt-3">
                {stats.applications}
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <h3 className="text-purple-700 font-bold text-lg">
                Registered Users
              </h3>

              <p className="text-3xl font-black text-purple-900 mt-3">
                {stats.users}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">
              <h3 className="text-yellow-700 font-bold text-lg">
                Winners
              </h3>

              <p className="text-3xl font-black text-yellow-900 mt-3">
                {stats.winners}
              </p>
            </div>

          </div>

        </div>
        </main>
    </div>
  );
}

export default AdminDashboard;