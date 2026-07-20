import { Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="py-24 bg-gradient-to-r from-green-800 to-green-950">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">

          <div className="flex justify-center mb-6">
            <Mail size={60} className="text-yellow-400" />
          </div>

          <h2 className="text-5xl font-bold text-white text-center">
            Never Miss a Giveaway
          </h2>

          <p className="text-green-100 text-center mt-4 mb-10">
            Subscribe to receive updates about new giveaways, winners, and exciting prizes.
          </p>

          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl outline-none text-gray-800"
            />

            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-green-900 px-8 py-4 rounded-xl font-bold transition"
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