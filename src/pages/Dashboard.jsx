import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";
import {
  Gift,
  Trophy,
  Bell,
  Users,
} from "lucide-react";

function Dashboard() {
  const { currentUser } = useAuth();

  const cards = [
    {
      title: "Applications",
      value: "3",
      icon: <Gift size={34} />,
      color: "bg-green-600",
    },
    {
      title: "Won Prizes",
      value: "1",
      icon: <Trophy size={34} />,
      color: "bg-yellow-500",
    },
    {
      title: "Notifications",
      value: "5",
      icon: <Bell size={34} />,
      color: "bg-blue-600",
    },
    {
      title: "Community",
      value: "50K+",
      icon: <Users size={34} />,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">

      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-700">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-gray-600">
            {currentUser?.displayName || "User"}
          </p>

          <p className="text-gray-500">
            {currentUser?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.color} text-white rounded-3xl p-8 shadow-xl`}
            >
              <div className="mb-5">
                {card.icon}
              </div>

              <h2 className="text-4xl font-bold">
                {card.value}
              </h2>

              <p className="mt-2 text-lg">
                {card.title}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-5">
            Latest Activity
          </h2>

          <div className="space-y-4">

            <div className="border rounded-xl p-5">
              🎉 You successfully registered your account.
            </div>

            <div className="border rounded-xl p-5">
              🎁 New giveaway is now available.
            </div>

            <div className="border rounded-xl p-5">
              🏆 Winners will be announced soon.
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;