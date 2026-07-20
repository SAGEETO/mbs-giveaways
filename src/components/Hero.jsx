import { Link } from "react-router-dom";
import { Gift, Trophy, Car, Smartphone } from "lucide-react";

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 bg-yellow-400 rounded-full -top-20 -left-20 blur-3xl"></div>
        <div className="absolute w-80 h-80 bg-white rounded-full bottom-0 right-0 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-flex items-center gap-2 bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-bold mb-6">
              <Gift size={18} />
              Official MBS Giveaway Platform
            </span>

            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Win Amazing
              <br />
              <span className="text-yellow-400">
                Rewards Every Week
              </span>
            </h1>

            <p className="text-green-100 text-lg mt-8 leading-8 max-w-xl">
              Participate in Mohammed Bin Salman Giveaways for a chance to
              win luxury cars, cash rewards, smartphones, villas and many
              other exciting prizes.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/giveaways"
                className="bg-yellow-400 hover:bg-yellow-300 text-green-900 px-8 py-4 rounded-xl font-bold shadow-xl transition"
              >
                Explore Giveaways
              </Link>

              <Link
                to="/register"
                className="border-2 border-white hover:bg-white hover:text-green-900 text-white px-8 py-4 rounded-xl font-bold transition"
              >
                Join Now
              </Link>

            </div>

          </div>

          {/* Right Side */}
          <div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">

              <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
                Featured Rewards
              </h2>

              <div className="space-y-5">

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <Gift className="text-yellow-500" />
                    <span className="font-bold">
                      Cash Giveaway
                    </span>
                  </div>

                  <span className="text-green-700 font-black">
                    $250,000
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <Car className="text-blue-600" />
                    <span className="font-bold">
                      Luxury SUV
                    </span>
                  </div>

                  <span className="font-black">
                    2026 Model
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <Smartphone className="text-purple-600" />
                    <span className="font-bold">
                      Latest Smartphone
                    </span>
                  </div>

                  <span className="font-black">
                    Flagship
                  </span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <Trophy className="text-yellow-500" />
                    <span className="font-bold">
                      Lucky Winners
                    </span>
                  </div>

                  <span className="text-green-700 font-black">
                    Every Week
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;