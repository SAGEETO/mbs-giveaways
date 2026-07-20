import { useEffect, useState } from "react";
import {
  Gift,
  Users,
  FileText,
  Trophy,
  PlusCircle,
  Eye,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { Link } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

import { subscribeToDashboardStats } from "../services/dashboardRealtime";

function AdminDashboard() {
  const [stats, setStats] = useState({
    giveaways: 0,
    applications: 0,
    users: 0,
    winners: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#ca8a04",
    "#9333ea",
    "#dc2626",
    "#0891b2",
  ];

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
          <h2 className="text-2xl font-bold text-green-700">
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

        <div className="flex items-center justify-between flex-wrap gap-4">

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
<div className="bg-white rounded-2xl shadow-lg p-6">
  <Gift className="text-green-700 mb-4" size={35} />
  <p className="text-gray-500">Giveaways</p>

  <h2 className="text-4xl font-black">
    {stats.giveaways}
  </h2>

  <p className="text-green-600 text-sm font-semibold mt-2">
    ● Live
  </p>
</div>
            

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <FileText className="text-blue-700 mb-4" size={35} />

            <p className="text-gray-500 font-medium">
              Applications
            </p>

            <h2 className="text-4xl font-black">
  {stats.applications}
</h2>

<p className="text-green-600 text-sm font-semibold mt-2">
  ● Live
</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <Users className="text-purple-700 mb-4" size={35} />

            <p className="text-gray-500 font-medium">
              Registered Users
            </p>

            <h2 className="text-4xl font-black">
  {stats.users}
</h2>

<p className="text-green-600 text-sm font-semibold mt-2">
  ● Live
</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <Trophy className="text-yellow-500 mb-4" size={35} />

            <p className="text-gray-500 font-medium">
              Winners
            </p>

            <h2 className="text-4xl font-black">
  {stats.winners}
</h2>

<p className="text-green-600 text-sm font-semibold mt-2">
  ● Live
</p>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="space-y-4">

              <Link
                to="/admin/create-giveaway"
                className="block bg-green-700 hover:bg-green-800 text-white p-4 rounded-xl font-semibold transition"
              >
                ➕ Create New Giveaway
              </Link>

              <Link
                to="/admin/manage-applications"
                className="block bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-xl font-semibold transition"
              >
                📄 Manage Applications
              </Link>

              <Link
                to="/admin/giveaways"
                className="block bg-purple-700 hover:bg-purple-800 text-white p-4 rounded-xl font-semibold transition"
              >
                🎁 Manage Giveaways
              </Link>

              <Link
                to="/"
                className="block bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-xl font-semibold transition"
              >
                <div className="flex items-center gap-2">
                  <Eye size={18} />
                  View Website
                </div>
              </Link>

            </div>

          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Platform Status
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Firebase</span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  Connected
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Authentication</span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  Active
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Firestore</span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  Online
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Storage</span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  Ready
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Admin Panel</span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  Running
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Analytics */}

        <div className="grid lg:grid-cols-2 gap-8 mt-12">

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Applications by Country
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart data={chartData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  fill="#15803d"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">
              Applications Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="applications"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >

                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Dashboard Summary */}

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Dashboard Summary
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-green-50 rounded-xl p-6">

              <p className="text-gray-600 text-sm">
                Total Giveaways
              </p>

              <h3 className="text-3xl font-bold text-green-700 mt-2">
                {stats.giveaways}
              </h3>

            </div>

            <div className="bg-blue-50 rounded-xl p-6">

              <p className="text-gray-600 text-sm">
                Total Applications
              </p>

              <h3 className="text-3xl font-bold text-blue-700 mt-2">
                {stats.applications}
              </h3>

            </div>

            <div className="bg-purple-50 rounded-xl p-6">

              <p className="text-gray-600 text-sm">
                Registered Users
              </p>

              <h3 className="text-3xl font-bold text-purple-700 mt-2">
                {stats.users}
              </h3>

            </div>

            <div className="bg-yellow-50 rounded-xl p-6">

              <p className="text-gray-600 text-sm">
                Total Winners
              </p>

              <h3 className="text-3xl font-bold text-yellow-600 mt-2">
                {stats.winners}
              </h3>

            </div>

          </div>
          <div className="mt-10">

            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Recent Activity
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between border rounded-xl p-5 hover:bg-gray-50 transition">
                <div>
                  <h3 className="font-bold">
                    New Giveaway Created
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Create and publish giveaways for users.
                  </p>
                </div>

                <span className="text-green-700 font-semibold">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between border rounded-xl p-5 hover:bg-gray-50 transition">
                <div>
                  <h3 className="font-bold">
                    Applications Received
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Total submitted applications from users.
                  </p>
                </div>

                <span className="text-blue-700 font-semibold">
                  {stats.applications}
                </span>
              </div>

              <div className="flex items-center justify-between border rounded-xl p-5 hover:bg-gray-50 transition">
                <div>
                  <h3 className="font-bold">
                    Winners Announced
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Total users selected as winners.
                  </p>
                </div>

                <span className="text-yellow-600 font-semibold">
                  {stats.winners}
                </span>
              </div>

              <div className="flex items-center justify-between border rounded-xl p-5 hover:bg-gray-50 transition">
                <div>
                  <h3 className="font-bold">
                    Registered Users
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Number of registered platform users.
                  </p>
                </div>

                <span className="text-purple-700 font-semibold">
                  {stats.users}
                </span>
              </div>

            </div>

          </div>

        </div>
        </main>
    </div>
  );
}

export default AdminDashboard;