import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = result.user.uid;

      const snap = await getDoc(doc(db, "users", uid));

      if (!snap.exists()) {
        alert("User profile not found.");
        await auth.signOut();
        return;
      }

      if (snap.data().role !== "admin") {
        alert("Access denied. You are not an admin.");
        await auth.signOut();
        return;
      }

      navigate("/admin/dashboard");

    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

        <h1 className="text-4xl font-bold text-center text-green-700">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Mohammed Bin Salman Giveaways
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-600 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-600 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;