import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import {
  subscribeToGiveaways,
  deleteGiveaway,
} from "../services/giveaways";

function ManageGiveaways() {
  const [giveaways, setGiveaways] = useState([]);
  const [search, setSearch] = useState("");

  async function loadGiveaways() {
    const data = await getGiveaways();
    setGiveaways(data);
  }

  useEffect(() => {
  const unsubscribe = subscribeToGiveaways((data) => {
    setGiveaways(data);
  });

  return () => unsubscribe();
}, []);
  async function removeGiveaway(id) {
    if (!window.confirm("Delete this giveaway?")) return;

    await deleteGiveaway(id);
  }

  const filteredGiveaways = giveaways.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            Manage Giveaways
          </h1>

          <Link
            to="/admin/create-giveaway"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold"
          >
            + New Giveaway
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search giveaway..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-4 mb-6"
        />

        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full">

            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Prize</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredGiveaways.map((item) => (

                <tr key={item.id} className="border-b">

                  <td className="p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-16 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-4 font-semibold">
                    {item.title}
                  </td>

                  <td className="p-4">
                    {item.category}
                  </td>

                  <td className="p-4">
                    {item.prize}
                  </td>

                  <td className="p-4">
                    {item.featured ? (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                        ⭐ Featured
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <Link
                        to={`/admin/edit-giveaway/${item.id}`}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => removeGiveaway(item.id)}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>
      </main>
    </div>
  );
}

export default ManageGiveaways;