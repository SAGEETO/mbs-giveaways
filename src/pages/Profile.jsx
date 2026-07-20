import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

import {
  Camera,
  Save,
  LogOut,
  Mail,
  User,
  Phone,
  Globe,
} from "lucide-react";

function Profile() {
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    role: "user",
    photoURL: "",
  });

  useEffect(() => {
    async function loadProfile() {
      const user = auth.currentUser;

      if (!user) {
        window.location.href = "/login";
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserData({
            ...userData,
            ...snap.data(),
            email: user.email,
          });
        } else {
          setUserData({
            name: user.displayName || "",
            email: user.email,
            phone: "",
            country: "",
            role: "user",
            photoURL: "",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }
  async function saveProfile() {
    try {
      const user = auth.currentUser;

      await setDoc(
        doc(db, "users", user.uid),
        userData,
        { merge: true }
      );

      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  }

  async function logout() {
    await signOut(auth);
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-950 to-green-700 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white">
          Loading Profile...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 to-green-700 py-8 px-4 sm:px-6">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="bg-green-800 h-28 sm:h-40"></div>

          <div className="px-4 sm:px-8 pb-8">

            <div className="-mt-16 flex flex-col items-center">

              <div className="relative">

                <img
                  src={
                    userData.photoURL ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(userData.name || "User") +
                      "&background=15803d&color=fff&size=200"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />

                <button
                  className="absolute bottom-0 right-0 bg-green-700 hover:bg-green-800 text-white rounded-full p-3"
                >
                  <Camera size={18} />
                </button>

              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mt-5 text-center">
                {userData.name || "User"}
              </h1>

              <p className="text-gray-500">
                {userData.email}
              </p>

              <span className="mt-3 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold capitalize">
                {userData.role}
              </span>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <User size={18} />
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your full name"
                />

              </div>

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <Mail size={18} />
                  Email Address
                </label>

                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full border rounded-xl p-4 bg-gray-100 cursor-not-allowed"
                />

              </div>

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <Phone size={18} />
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your phone number"
                />

              </div>

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <Globe size={18} />
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={userData.country}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your country"
                />

              </div>

            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4">

            <button
                onClick={saveProfile}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition"
              >
                <Save size={20} />
                Save Profile
              </button>

              <button
                onClick={logout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition"
              >
                <LogOut size={20} />
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;