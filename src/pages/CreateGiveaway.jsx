import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

function CreateGiveaway() {
  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const createGiveaway = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "giveaways"), {
        title,
        prize,
        description,
        deadline,
        featured,
        image,
        createdAt: serverTimestamp(),
      });

      alert("🎉 Giveaway created successfully!");

      setTitle("");
      setPrize("");
      setDescription("");
      setDeadline("");
      setFeatured(false);
      setImage("");

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-950 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={createGiveaway}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-lg border border-white/20"
      >
        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Create Giveaway
        </h1>

        <input
          className="w-full p-3 rounded-lg mb-4"
          placeholder="Giveaway Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="w-full p-3 rounded-lg mb-4"
          placeholder="Prize"
          value={prize}
          onChange={(e) => setPrize(e.target.value)}
          required
        />

        <textarea
          className="w-full p-3 rounded-lg mb-4"
          rows="4"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full p-3 rounded-lg mb-4"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full p-3 rounded-lg mb-4"
          placeholder="Paste Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <label className="flex items-center gap-2 text-white mb-6">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Make this the Featured Giveaway
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-green-900 py-3 rounded-xl font-bold transition"
        >
          {loading ? "Creating Giveaway..." : "Create Giveaway"}
        </button>
      </form>
    </div>
  );
}

export default CreateGiveaway;