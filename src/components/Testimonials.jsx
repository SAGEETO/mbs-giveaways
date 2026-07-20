import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ali Hassan",
    country: "Riyadh",
    review:
      "Amazing experience! The platform is easy to use and I received my prize quickly.",
  },
  {
    name: "Sara Ahmed",
    country: "Jeddah",
    review:
      "I never expected to win. The whole process was smooth and transparent.",
  },
  {
    name: "Mohammed Saleh",
    country: "Dammam",
    review:
      "Professional platform with exciting giveaways. I recommend it to everyone.",
  },
];

function Testimonials() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          What Our Participants Say
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-16">
          Hear from some of our recent participants.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
              </div>

              <p className="text-gray-600 italic">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-500">{item.country}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;