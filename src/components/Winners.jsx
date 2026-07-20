import { Trophy } from "lucide-react";

const winners = [
  {
    name: "Ahmed Al-Qahtani",
    prize: "$250,000",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Fatimah Al-Harbi",
    prize: "Luxury SUV",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Omar Al-Shammari",
    prize: "iPhone 17 Pro",
    image: "https://i.pravatar.cc/150?img=15",
  },
];

function Winners() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Recent Winners
        </h2>

        <p className="text-center text-gray-500 mt-3 mb-14">
          Congratulations to our latest lucky winners.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {winners.map((winner, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 text-center hover:scale-105 transition"
            >
              <img
                src={winner.image}
                alt={winner.name}
                className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-yellow-400"
              />

              <h3 className="text-2xl font-bold mt-6">
                {winner.name}
              </h3>

              <p className="text-green-700 font-semibold mt-2">
                Won {winner.prize}
              </p>

              <div className="flex justify-center mt-5">
                <Trophy className="text-yellow-500" size={36} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Winners;