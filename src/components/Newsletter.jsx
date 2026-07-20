import { Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-900 to-green-700">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <div className="bg-white rounded-3xl p-10 shadow-2xl">

          <div className="flex justify-center mb-6">
            <Mail size={50} className="text-green-700" />
          </div>

          <h2 className="text-4xl font-black text-green-800">
            Never Miss a Giveaway
          </h2>

          <p className="text-gray-600 mt-5 text-lg">
            Subscribe to receive updates about new giveaways, winners and special rewards.
          </p>

          <form className="mt-10 flex flex-col md:flex-row gap-4">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-700"
            />

            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold transition"
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;