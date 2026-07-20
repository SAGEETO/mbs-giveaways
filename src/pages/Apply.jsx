import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { getGiveaway } from "../services/giveaways";
import { submitApplication } from "../services/applications";

function Apply() {
  const { id } = useParams();
  const auth = getAuth();

  const [giveaway, setGiveaway] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
  });

  useEffect(() => {
    async function loadGiveaway() {
      try {
        const data = await getGiveaway(id);
        setGiveaway(data);

        if (auth.currentUser) {
          setForm((prev) => ({
            ...prev,
            fullName: auth.currentUser.displayName || "",
            email: auth.currentUser.email || "",
          }));
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadGiveaway();
  }, [id]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please login before applying.");
      return;
    }

    try {
      await submitApplication({
        ...form,
        userId: auth.currentUser.uid,
        giveawayId: id,
        giveawayTitle: giveaway.title,
      });

      alert("🎉 Application submitted successfully!");

      setForm({
        fullName: auth.currentUser.displayName || "",
        email: auth.currentUser.email || "",
        phone: "",
        country: "",
      });

    } catch (error) {
      alert(error.message);
    }
  }

  if (!giveaway) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading giveaway...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12 px-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-green-700">
          Apply for Giveaway
        </h1>

        <p className="text-xl mt-3 font-semibold">
          {giveaway.title}
        </p>

        <p className="text-green-700 font-bold mt-2">
          Prize: {giveaway.prize}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="w-full border rounded-xl p-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white p-4 rounded-xl font-bold"
          >
            Submit Application
          </button>

        </form>

      </div>
    </div>
  );
}

export default Apply;