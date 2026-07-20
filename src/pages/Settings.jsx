import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  LogOut,
  Save,
} from "lucide-react";

function Settings() {
  const navigate = useNavigate();

  const [emailNotification, setEmailNotification] = useState(true);
  const [winnerNotification, setWinnerNotification] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  async function logout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  function saveSettings() {
    alert("✅ Settings saved successfully!");
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">

      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">

          {/* Header */}

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-green-700 p-4 rounded-2xl">
              <SettingsIcon size={34} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-green-700">
                Settings
              </h1>

              <p className="text-gray-500">
                Manage your account preferences.
              </p>
            </div>

          </div>

          {/* Notifications */}

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">

            <div className="flex items-center gap-3 mb-5">

              <Bell className="text-green-700" />

              <h2 className="text-xl font-bold">
                Notifications
              </h2>

            </div>

            <div className="space-y-5">

              <label className="flex justify-between items-center">

                <span>Email Notifications</span>

                <input
                  type="checkbox"
                  checked={emailNotification}
                  onChange={() =>
                    setEmailNotification(!emailNotification)
                  }
                  className="w-5 h-5"
                />

              </label>

              <label className="flex justify-between items-center">

                <span>Winner Notifications</span>

                <input
                  type="checkbox"
                  checked={winnerNotification}
                  onChange={() =>
                    setWinnerNotification(!winnerNotification)
                  }
                  className="w-5 h-5"
                />

              </label>

            </div>

          </div>

          {/* Appearance */}

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">

            <div className="flex items-center gap-3 mb-5">

              <Shield className="text-green-700" />

              <h2 className="text-xl font-bold">
                Appearance
              </h2>

            </div>

            <label className="flex justify-between items-center">

              <span>Dark Mode</span>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5"
              />

            </label>

          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button
              onClick={saveSettings}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save Settings
            </button>

            <button
              onClick={logout}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;