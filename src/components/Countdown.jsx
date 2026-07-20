import { Clock } from "lucide-react";

function Countdown() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-3xl p-12 text-center shadow-2xl">

          <Clock className="mx-auto text-yellow-400 mb-6" size={60} />

          <h2 className="text-4xl font-bold text-white">
            Next Giveaway Ends In
          </h2>

          <p className="text-green-100 mt-3 mb-10">
            Apply before the countdown reaches zero.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-5xl font-black text-yellow-400">12</h3>
              <p className="text-white mt-2">Days</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-5xl font-black text-yellow-400">08</h3>
              <p className="text-white mt-2">Hours</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-5xl font-black text-yellow-400">45</h3>
              <p className="text-white mt-2">Minutes</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-5xl font-black text-yellow-400">20</h3>
              <p className="text-white mt-2">Seconds</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Countdown;