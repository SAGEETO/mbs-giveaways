import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Trophy, MapPin, Gift } from "lucide-react";
import Footer from "../components/Footer";

import { db } from "../firebase/config";
import Navbar from "../components/Navbar";

function Winners() {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWinners() {
      try {
        const snapshot = await getDocs(collection(db, "winners"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWinners(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWinners();
  }, []);
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gradient-to-br from-green-950 to-green-800 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">
            Loading Winners...
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 pt-32 pb-16 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <Trophy
              size={60}
              className="mx-auto text-yellow-400 mb-4"
            />

            <h1 className="text-5xl font-black text-white">
              Giveaway Winners
            </h1>

            <p className="text-green-100 mt-4 text-lg">
              Congratulations to everyone who has won amazing prizes.
            </p>

          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
{winners.length === 0 ? (

              <div className="col-span-full bg-white rounded-3xl shadow-xl p-12 text-center">

                <Trophy
                  size={70}
                  className="mx-auto text-yellow-500 mb-6"
                />

                <h2 className="text-3xl font-bold text-green-800">
                  No Winners Yet
                </h2>

                <p className="text-gray-500 mt-4">
                  Winners will appear here as soon as the admin announces them.
                </p>

              </div>

            ) : (

              winners.map((winner) => (

                <div
                  key={winner.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                >

                  <img
                    src={
                      winner.image ||
                      "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b?w=800"
                    }
                    alt={winner.giveawayTitle}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-6">

                    <div className="flex items-center gap-2 mb-4">

                      <Trophy
                        size={22}
                        className="text-yellow-500"
                      />

                      <h2 className="text-2xl font-bold text-green-800">
                        {winner.fullName || "Winner"}
                      </h2>

                    </div>

                    <div className="space-y-3">

                      <div className="flex items-center gap-2 text-gray-600">

                        <MapPin size={18} />

                        <span>
                          {winner.country || "Unknown Country"}
                        </span>

                      </div>

                      <div className="flex items-center gap-2 text-gray-600">

                        <Gift size={18} />

                        <span>
                          {winner.prize || "Amazing Prize"}
                        </span>

                      </div>

                      <div className="bg-green-50 rounded-xl p-4 mt-5">

                        <p className="text-sm text-gray-500">
                          Giveaway
                        </p>

                        <h3 className="font-bold text-green-700">
                          {winner.giveawayTitle || "Giveaway"}
                        </h3>
<Footer />
                      </div>

                    </div>

                  </div>

                </div>

              ))

            )}
            </div>

        </div>

      </div>
    </>
  );
}

export default Winners;
          