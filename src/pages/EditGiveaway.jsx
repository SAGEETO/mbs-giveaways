import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { getGiveaway, updateGiveaway } from "../services/giveaways";
import { uploadImage } from "../services/storage";

function EditGiveaway() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    prize: "",
    prizeValue: "",
    category: "",
    description: "",
    endDate: "",
    featured: false,
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadGiveaway() {
      const giveaway = await getGiveaway(id);

      if (!giveaway) return;

      setForm(giveaway);
      setPreview(giveaway.image);
    }

    loadGiveaway();
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      let imageURL = form.image;

      if (imageFile) {
        imageURL = await uploadImage(imageFile);
      }

      await updateGiveaway(id, {
        ...form,
        image: imageURL,
      });

      alert("✅ Giveaway updated successfully!");

      navigate("/admin/giveaways");

    } catch (error) {
      console.error(error);
      alert("Failed to update giveaway.");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <main className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Edit Giveaway
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl"
        >

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border rounded-lg p-4 mb-5"
          />

          <input
            type="text"
            name="prize"
            value={form.prize}
            onChange={handleChange}
            placeholder="Prize"
            className="w-full border rounded-lg p-4 mb-5"
          />

          <input
            type="number"
            name="prizeValue"
            value={form.prizeValue}
            onChange={handleChange}
            placeholder="Prize Value"
            className="w-full border rounded-lg p-4 mb-5"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-4 mb-5"
          >
            <option value="">Select Category</option>
            <option value="Cash">Cash</option>
            <option value="Car">Car</option>
            <option value="Phone">Phone</option>
            <option value="Electronics">Electronics</option>
            <option value="Travel">Travel</option>
            <option value="Gift Card">Gift Card</option>
          </select>

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-4 mb-5"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            className="w-full border rounded-lg p-4 mb-5"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full border rounded-lg p-4 mb-5"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl mb-5"
            />
          )}

          <label className="flex items-center gap-3 mb-6">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured Giveaway
          </label>

          <button
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold"
          >
            {loading ? "Updating..." : "Update Giveaway"}
          </button>

        </form>

      </main>

    </div>
  );
}

export default EditGiveaway;