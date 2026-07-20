import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import AdminSidebar from "../components/AdminSidebar";
import { db } from "../firebase/config";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
const totalUsers = users.length;

const activeUsers = users.filter(
  (user) => (user.status || "active") === "active"
).length;

const suspendedUsers = users.filter(
  (user) => user.status === "suspended"
).length;

const winners = users.filter(
  (user) => user.isWinner === true
).length;

  async function loadUsers() {
    try {
      const snapshot = await getDocs(collection(db, "users"));

      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);
  async function toggleStatus(user) {
    try {
      await updateDoc(doc(db, "users", user.id), {
        status: user.status === "active" ? "suspended" : "active",
      });

      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteDoc(doc(db, "users", id));
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        (user.fullName || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (user.email || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [users, search]);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

  <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg">
    <h2 className="text-lg">Total Users</h2>
    <p className="text-4xl font-bold mt-2">
      {totalUsers}
    </p>
  </div>

  <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
    <h2 className="text-lg">Active Users</h2>
    <p className="text-4xl font-bold mt-2">
      {activeUsers}
    </p>
  </div>

  <div className="bg-red-600 text-white rounded-2xl p-6 shadow-lg">
    <h2 className="text-lg">Suspended</h2>
    <p className="text-4xl font-bold mt-2">
      {suspendedUsers}
    </p>
  </div>

  <div className="bg-yellow-500 text-white rounded-2xl p-6 shadow-lg">
    <h2 className="text-lg">Winners</h2>
    <p className="text-4xl font-bold mt-2">
      {winners}
    </p>
  </div>

</div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-700 text-white">

              <tr>
                <th className="p-4 text-left">Photo</th>
<th className="p-4 text-left">User</th>
<th className="p-4 text-left">Email</th>
<th className="p-4 text-left">Phone</th>
<th className="p-4 text-left">Country</th>
<th className="p-4 text-left">Registered</th>
<th className="p-4 text-left">Status</th>
<th className="p-4 text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
  <img
    src={
      user.photoURL ||
      "https://ui-avatars.com/api/?name=User&background=15803d&color=fff"
    }
    alt="Profile"
    className="w-12 h-12 rounded-full object-cover"
  />
</td>

<td className="p-4 font-semibold">
  {user.fullName || "No Name"}
</td>

<td className="p-4">
  {user.email || "-"}
</td>

<td className="p-4">
  {user.phone || "-"}
</td>

<td className="p-4">
  {user.country || "-"}
</td>

<td className="p-4">
  {user.createdAt?.toDate
    ? user.createdAt.toDate().toLocaleDateString()
    : "-"}
</td>
                  

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        user.status === "suspended"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.status || "active"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">

                    <button
                        onClick={() => toggleStatus(user)}
                        className={`px-4 py-2 rounded-lg text-white ${
                          user.status === "suspended"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                      >
                        {user.status === "suspended"
                          ? "Activate"
                          : "Suspend"}
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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

export default ManageUsers;