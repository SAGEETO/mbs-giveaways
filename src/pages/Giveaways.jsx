import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Search } from "lucide-react";
import Footer from "../components/Footer";

import { db } from "../firebase/config";
import Navbar from "../components/Navbar";
import GiveawayCard from "../components/GiveawayCard";

function Giveaways() {
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadGiveaways() {
      try {
        const snapshot = await getDocs(collection(db, "giveaways"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGiveaways(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadGiveaways();
  }, []);

  const filteredGiveaways = useMemo(() => {
    return giveaways.filter((giveaway) => {
      const query = search.toLowerCase();

      return (
        (giveaway.title || "").toLowerCase().includes(query) ||
        (giveaway.prize || "").toLowerCase().includes(query)
      );
    });
  }, [giveaways, search]);
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-100 pt-32 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-green-700">
            Loading Giveaways...
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 pt-28 pb-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <h1 className="text-5xl font-black text-green-900">
              All Giveaways
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Browse all available giveaways and apply before they end.
            </p>

          </div>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mb-10">

            <div className="relative">

              <Search
                className="absolute left-4 top-4 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search giveaways..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredGiveaways.length === 0 ? (

              <div className="col-span-full text-center py-20">

                <h2 className="text-3xl font-bold text-gray-500">
                  No giveaways found
                </h2>

                <p className="text-gray-400 mt-3">
                  Try searching with another keyword.
                </p>

              </div>

            ) : (

              filteredGiveaways.map((giveaway) => (

                <GiveawayCard
                  key={giveaway.id}
                  giveaway={giveaway}
                />

              ))

            )}
<Footer />
          </div>
        </div>
      </div>
    </>
  );
  }

export default Giveaways;