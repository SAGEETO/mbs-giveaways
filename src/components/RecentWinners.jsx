import { useEffect, useState } from "react";
import { getWinners } from "../services/winners";
import { Link } from "react-router-dom";
import { Trophy, Globe, Gift, ArrowRight } from "lucide-react";

function RecentWinners() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    async function loadWinners() {
      const data = await getWinners();

      // Show latest 6 winners
      setWinners(data.slice(0, 6));
    }

    loadWinners();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-bold">
            <Trophy size={18} />
            Recent Winners
          </span>

          <h2 className="text-5xl font-black text-green-800 mt-6">
            Meet Our Lucky Winners
          </h2>

          <p className="text-gray-600 mt-5 text-lg max-w-2xl mx-auto">
            Every giveaway creates new winners. Yours could be next!
          </p>

        </div>

        {winners.length === 0 ? (

          <div className="bg-gray-100 rounded-3xl p-16 text-center">

            <Trophy
              size={70}
              className="mx-auto text-yellow-500 mb-6"
            />

            <h2 className="text-3xl font-bold text-green-700">
              No Winners Yet
            </h2>

            <p className="text-gray-500 mt-4">
              Winners will appear here after the first giveaway ends.
            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {winners.map((winner) => (

              <div
                key={winner.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                <img
                  src={
                    winner.image ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(
                        winner.winnerName || "Winner"
                      ) +
                      "&background=15803d&color=fff&size=400"
                  }
                  alt={winner.winnerName}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <div className="flex items-center justify-between">

                    <h3 className="text-2xl font-bold text-green-800">
                      {winner.winnerName}
                    </h3>

                    <span className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
                      Winner
                    </span>

                  </div>

                  <div className="mt-4 space-y-3">

                    <div className="flex items-center gap-2 text-gray-600">
                      <Globe size={18} />
                      {winner.country}
                    </div>

                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                      <Gift size={18} />
                      {winner.prize || winner.giveawayTitle}
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        <div className="text-center mt-14">

          <Link
            to="/winners"
            className="inline-flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold transition"
          >
            View All Winners
            <ArrowRight size={20} />
          </Link>

        </div>

      </div>
    </section>
  );
}

export default RecentWinners;