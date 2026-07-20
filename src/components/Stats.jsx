import { Users, Trophy, Gift, Globe } from "lucide-react";

function Stats() {
  const stats = [
    {
      icon: <Users size={42} />,
      number: "50,000+",
      title: "Participants",
    },
    {
      icon: <Trophy size={42} />,
      number: "320+",
      title: "Winners",
    },
    {
      icon: <Gift size={42} />,
      number: "$10M+",
      title: "Prizes Awarded",
    },
    {
      icon: <Globe size={42} />,
      number: "25+",
      title: "Countries",
    },
  ];

  return (
    <section className="bg-green-950 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-white">
          Our Achievements
        </h2>

        <p className="text-green-200 text-center mt-4 mb-14">
          Trusted by thousands of participants worldwide.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition"
            >
              <div className="text-yellow-400 flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold text-white">
                {item.number}
              </h3>

              <p className="text-green-200 mt-3">
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Stats;