import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { uploadImage } from "../services/storage";
import AdminSidebar from "../components/AdminSidebar";

function CreateGiveaway() {
  const [form, setForm] = useState({
    title: "",
    prize: "",
    prizeValue: "",
    category: "",
    description: "",
    endDate: "",
    featured: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB.");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageURL = "";

      if (imageFile) {
        imageURL = await uploadImage(imageFile);
      }

      await addDoc(collection(db, "giveaways"), {
        ...form,
        image: imageURL,
        status: "active",
        createdAt: serverTimestamp(),
      });

      alert("🎉 Giveaway created successfully!");

      setForm({
        title: "",
        prize: "",
        prizeValue: "",
        category: "",
        description: "",
        endDate: "",
        featured: false,
      });

      setImageFile(null);
      setPreview("");

    } catch (error) {
      console.error(error);
      alert("Failed to create giveaway.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-green-800 mb-8">
          Create Giveaway
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl"
        >
          <input
            type="text"
            name="title"
            placeholder="Giveaway Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-4 mb-5"
            required
          />

          <input
            type="text"
            name="prize"
            placeholder="Prize Name"
            value={form.prize}
            onChange={handleChange}
            className="w-full border rounded-lg p-4 mb-5"
            required
          />

          <input
            type="number"
            name="prizeValue"
            placeholder="Prize Value (USD)"
            value={form.prizeValue}
            onChange={handleChange}
            className="w-full border rounded-lg p-4 mb-5"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-4 mb-5"
            required
          >
            <option value="">Select Category</option>
            <option value="Cash">Cash</option>
            <option value="Car">Car</option>
            <option value="Phone">Phone</option>
            <option value="Electronics">Electronics</option>
            <option value="Travel">Travel</option>
            <option value="Gift Card">Gift Card</option>
          </select>

          <label className="block font-semibold mb-2">
            Giveaway Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full border rounded-lg p-3 mb-5"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl mb-5"
            />
          )}

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-4 mb-5"
            required
          />

          <textarea
            name="description"
            placeholder="Giveaway Description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            className="w-full border rounded-lg p-4 mb-5"
            required
          />

          <label className="flex items-center gap-3 mb-8">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />

            <span className="font-semibold">
              Make this a Featured Giveaway
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold text-lg"
          >
            {loading ? "Uploading Giveaway..." : "Create Giveaway"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateGiveaway;