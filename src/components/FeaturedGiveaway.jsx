import { Link } from "react-router-dom";

function FeaturedGiveaway({ giveaway }) {
  if (!giveaway) return null;

  return (
    <section className="bg-gradient-to-r from-green-900 to-green-700 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <span className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-bold">
              ⭐ Featured Giveaway
            </span>

            <h1 className="text-5xl font-black text-white mt-8">
              {giveaway.title}
            </h1>

            <h2 className="text-yellow-300 text-4xl font-black mt-5">
              {giveaway.prize}
            </h2>

            <p className="text-green-100 text-lg mt-8 leading-8">
              {giveaway.description}
            </p>

            <Link
              to={`/giveaway/${giveaway.id}`}
              className="inline-block mt-10 bg-yellow-400 hover:bg-yellow-300 text-green-900 px-8 py-4 rounded-xl font-bold"
            >
              View Giveaway
            </Link>
          </div>

          <div>
            <img
              src={giveaway.image}
              alt={giveaway.title}
              className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default FeaturedGiveaway;