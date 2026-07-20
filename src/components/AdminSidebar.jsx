import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Gift,
  Users,
  Settings,
  LogOut,
} from "lucide-react";


import useAuth from "../hooks/useAuth";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error(error);
    }
  }

const menu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Create Giveaway",
    path: "/admin/create-giveaway",
    icon: <PlusCircle size={20} />,
  },
  {
    name: "Manage Giveaways",
    path: "/admin/giveaways",
    icon: <Gift size={20} />,
  },
  {
    name: "Applications",
    path: "/admin/manage-applications",
    icon: <Users size={20} />,
  },
  {
    name: "Manage Users",
    path: "/admin/users",
    icon: <Users size={20} />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <Settings size={20} />,
  },
];

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-green-900 to-green-800 text-white flex flex-col shadow-2xl">

      {/* Header */}
      <div className="p-8 border-b border-green-700">
        <h1 className="text-3xl font-bold">
          MBS Admin
        </h1>

        <p className="text-green-200 mt-2">
          Giveaway Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-3">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-yellow-400 text-green-900 font-bold shadow-lg"
                : "hover:bg-green-700"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>

        ))}

      </nav>

      {/* Logout */}
      <div className="p-5 border-t border-green-700">

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

export default AdminSidebar;