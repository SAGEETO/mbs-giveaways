import {
  Users,
  Trophy,
  Gift,
  Globe,
} from "lucide-react";

function LiveStats() {
  const stats = [
    {
      icon: <Users size={40} />,
      number: "150K+",
      title: "Participants",
    },
    {
      icon: <Trophy size={40} />,
      number: "2,500+",
      title: "Winners",
    },
    {
      icon: <Gift size={40} />,
      number: "$18M+",
      title: "Rewards Given",
    },
    {
      icon: <Globe size={40} />,
      number: "50+",
      title: "Countries",
    },
  ];

  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-black text-green-800">
            Our Achievement
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Thousands of winners from around the world trust our giveaways.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl text-white p-8 text-center shadow-xl hover:scale-105 transition duration-300"
            >
              <div className="flex justify-center text-yellow-400 mb-5">
                {item.icon}
              </div>

              <h3 className="text-4xl font-black">
                {item.number}
              </h3>

              <p className="mt-3 text-green-100">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default LiveStats;