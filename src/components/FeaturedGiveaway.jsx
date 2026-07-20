import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Gift, ArrowRight } from "lucide-react";

function FeaturedGiveaways() {
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
            <Gift size={18} />
            Active Giveaways
          </span>

          <h2 className="text-5xl font-black text-green-800 mt-6">
            Participate & Win Amazing Rewards
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-lg">
            Browse our latest giveaways and apply today for your chance to
            become our next lucky winner.
          </p>

        </div>

        {loading ? (

          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-green-700">
              Loading Giveaways...
            </h2>
          </div>

        ) : giveaways.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-green-700">
              No Giveaways Available
            </h2>

            <p className="text-gray-500 mt-4">
              Check back later for exciting opportunities.
            </p>
          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {giveaways.map((giveaway) => (

              <div
                key={giveaway.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                <img
                  src={
                    giveaway.image ||
                    "https://via.placeholder.com/600x400?text=Giveaway"
                  }
                  alt={giveaway.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-green-800">
                    {giveaway.title}
                  </h3>

                  <p className="text-yellow-500 font-black text-3xl mt-3">
                    {giveaway.prize}
                  </p>

                  <p className="text-gray-600 mt-4 line-clamp-3">
                    {giveaway.description}
                  </p>

                  <p className="mt-5 text-sm text-gray-500">
                    Ends: {giveaway.endDate || "Coming Soon"}
                  </p>

                  <Link
                    to={`/giveaway/${giveaway.id}`}
                    className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}

export default FeaturedGiveaways;