import { Link } from "react-router-dom";
import { ArrowRight, Gift, Trophy } from "lucide-react";
import mbsimage from "../assets/mbs.png";

function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-950 via-green-800 to-green-700 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-yellow-400/20 blur-[120px] rounded-full -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-green-400/20 blur-[120px] rounded-full bottom-0 right-0"></div>

      <div className="max-w-7xl mx-auto px-8 pt-40 pb-24 relative">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>

            <span className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-semibold">
              🎉 Live Giveaway Event
            </span>

            <h1 className="text-6xl font-black text-white mt-8 leading-tight">
              Welcome to Mohammad Bin Salman Giveaways
              <span className="text-yellow-300"> Rewards </span>
              Every Month
            </h1>

            <p className="text-green-100 text-xl mt-8 leading-9">
              Join thousands of participants for exciting giveaways featuring
              cash prizes, electronics, vehicles and many more.
            </p>

            <div className="flex gap-5 mt-10">

              <Link
                to="/giveaways"
                className="bg-yellow-400 hover:bg-yellow-300 text-green-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2"
              >
                Join Giveaway
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/about"
                className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-green-900 transition"
              >
                Learn More
              </Link>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center">

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">

              <Gift className="text-yellow-300 mx-auto" size={70} />

              <h2 className="text-white text-3xl font-bold text-center mt-6">
                Current Jackpot
              </h2>

              <p className="text-yellow-300 text-center text-5xl font-black mt-6">
                $250,000
              </p>

              <div className="grid grid-cols-2 gap-6 mt-10">

                <div className="bg-white/10 rounded-2xl p-5 text-center">
                  <Trophy className="mx-auto text-yellow-300" />
                  <h3 className="text-white text-3xl font-bold mt-3">
                    320+
                  </h3>
                  <p className="text-green-100">
                    Winners
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-5 text-center">
                  <Gift className="mx-auto text-yellow-300" />
                  <h3 className="text-white text-3xl font-bold mt-3">
                    50+
                  </h3>
                  <p className="text-green-100">
                    Giveaways
                  </p>
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