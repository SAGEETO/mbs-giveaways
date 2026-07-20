import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import AdminSidebar from "../components/AdminSidebar";

function AdminSettings() {
  const [settings, setSettings] = useState({
    websiteName: "",
    supportEmail: "",
    phone: "",
    heroTitle: "",
    heroSubtitle: "",
    facebook: "",
    instagram: "",
    twitter: "",
    whatsapp: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const ref = doc(db, "settings", "website");
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setSettings(snap.data());
    }
  }

  function handleChange(e) {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await setDoc(
        doc(db, "settings", "website"),
        settings
      );

      alert("Settings updated successfully!");

    } catch (error) {
      console.error(error);
      alert("Failed to save settings.");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <main className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Website Settings
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl space-y-5"
        >

          <input
            name="websiteName"
            placeholder="Website Name"
            value={settings.websiteName}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            name="supportEmail"
            placeholder="Support Email"
            value={settings.supportEmail}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            name="phone"
            placeholder="Support Phone"
            value={settings.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            name="heroTitle"
            placeholder="Homepage Hero Title"
            value={settings.heroTitle}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <textarea
            name="heroSubtitle"
            placeholder="Homepage Hero Subtitle"
            value={settings.heroSubtitle}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-4"
          />

          <input
            name="facebook"
            placeholder="Facebook Link"
            value={settings.facebook}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            name="instagram"
            placeholder="Instagram Link"
            value={settings.instagram}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            name="twitter"
            placeholder="X (Twitter) Link"
            value={settings.twitter}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <input
            name="whatsapp"
            placeholder="WhatsApp Link"
            value={settings.whatsapp}
            onChange={handleChange}
            className="w-full border rounded-lg p-4"
          />

          <button
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold w-full"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>

        </form>

      </main>

    </div>
  );
}

export default AdminSettings;