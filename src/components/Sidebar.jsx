import {
  LayoutDashboard,
  Gift,
  Trophy,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <aside className="w-72 min-h-screen bg-green-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-green-700">
        <h1 className="text-2xl font-bold">
          Mohammed Bin Salman Giveaway
        </h1>

        <p className="text-green-200 text-sm mt-1">
          User Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-800 transition"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/my-applications"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-800 transition"
        >
          <Gift size={22} />
          My Applications
        </Link>

        <Link
          to="/won-prizes"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-800 transition"
        >
          <Trophy size={22} />
          Won Prizes
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-800 transition"
        >
          <User size={22} />
          Profile
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-800 transition"
        >
          <Settings size={22} />
          Settings
        </Link>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;