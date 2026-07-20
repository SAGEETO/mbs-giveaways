import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Trophy, Gift, Mail, Award } from "lucide-react";

import Sidebar from "../components/Sidebar";
import { auth, db } from "../firebase/config";

function WonPrizes() {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrizes() {
      try {
        const user = auth.currentUser;

        if (!user) {
          setLoading(false);
          return;
        }

        const snapshot = await getDocs(collection(db, "winners"));

        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((winner) => winner.userId === user.uid);

        setPrizes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPrizes();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700">
            Loading your prizes...
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-yellow-400 p-4 rounded-2xl">
              <Trophy className="text-green-900" size={36} />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-green-700">
                My Won Prizes
              </h1>

              <p className="text-gray-500 mt-1">
                Congratulations! Here are all your winning prizes.
              </p>
            </div>

          </div>

          {prizes.length === 0 ? (

            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center">

              <Award
                size={70}
                className="mx-auto text-yellow-500"
              />

              <h2 className="text-2xl font-bold mt-6">
                No prizes yet
              </h2>

              <p className="text-gray-500 mt-3">
                Keep participating in giveaways.
                Your winning prizes will appear here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {prizes.map((prize) => (

                <div
                  key={prize.id}
                  className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl p-6 text-white shadow-xl hover:scale-[1.02] transition"
                >

                  <div className="flex justify-between items-start">

                    <Gift
                      size={45}
                      className="text-yellow-300"
                    />

                    <span className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-bold">
                      WINNER
                    </span>

                  </div>

                  <h2 className="text-2xl font-bold mt-6">
                    {prize.giveawayTitle || "Giveaway"}
                  </h2>

                  <div className="mt-6 space-y-4">

                    <div>
                      <p className="text-green-100 text-sm">
                        Prize
                      </p>

                      <p className="text-2xl font-bold text-yellow-300">
                        {prize.prize || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-green-100 text-sm">
                        Winner
                      </p>

                      <p className="font-semibold">
                        {prize.winnerName ||
                          prize.fullName ||
                          "Unknown"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">

                      <Mail size={18} />

                      <span>
                        {prize.winnerEmail ||
                          prize.email ||
                          "No email"}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>
    </div>
  );
}

export default WonPrizes;