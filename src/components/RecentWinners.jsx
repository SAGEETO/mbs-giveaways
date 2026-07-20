import { useEffect, useState } from "react";
import { getWinners } from "../services/winners";
import { Link } from "react-router-dom";

function RecentWinners() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    async function loadWinners() {
      try {
        const data = await getWinners();
        setWinners(data.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    }

    loadWinners();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-700">
          Recent Winners
        </h2>

        <p className="text-center text-gray-500 mt-3 mb-12">
          Congratulations to our latest lucky winners.
        </p>

        {winners.length === 0 ? (
          <p className="text-center text-gray-500">
            No winners yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {winners.map((winner) => (
              <div
                key={winner.id}
                className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={
                    winner.image ||
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800"
                  }
                  alt={winner.winnerName}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    {winner.winnerName}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    🌍 {winner.country || "Not specified"}
                  </p>

                  <p className="text-green-700 font-bold mt-3">
                    {winner.giveawayTitle}
                  </p>

                  <p className="mt-2">
                    Prize: {winner.prize || "Not specified"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/winners"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold"
          >
            View All Winners
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecentWinners;