import GiveawayCountdown from "./GiveawayCountdown";
import { Link } from "react-router-dom";

function GiveawayCard({ giveaway }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative">

        <img
          src={
            giveaway.image ||
            "https://via.placeholder.com/600x350?text=Giveaway"
          }
          alt={giveaway.title}
          className="w-full h-60 object-cover"
        />

        <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
          LIVE
        </span>

      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold text-green-800">
          {giveaway.title}
        </h2>

        <p className="text-3xl text-yellow-500 font-black mt-3">
          {giveaway.prize}
        </p>

        <p className="text-gray-600 mt-4 line-clamp-3">
          {giveaway.description}
        </p>
<GiveawayCountdown endDate={giveaway.endDate} />

        <div className="mt-6 flex justify-between items-center">
          <span className="text-gray-500">
            Ends: {giveaway.endDate}
          </span>

          <Link
            to={`/giveaway/${giveaway.id}`}
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl font-bold"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
}

export default GiveawayCard;