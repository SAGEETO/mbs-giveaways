import {
  ShieldCheck,
  Trophy,
  Globe,
  Clock,
} from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck size={45} className="text-green-700" />,
      title: "Trusted Platform",
      description:
        "Secure and transparent giveaway platform with fair winner selection.",
    },
    {
      icon: <Trophy size={45} className="text-yellow-500" />,
      title: "Real Winners",
      description:
        "Thousands of winners have already received amazing prizes worldwide.",
    },
    {
      icon: <Globe size={45} className="text-blue-600" />,
      title: "Worldwide Access",
      description:
        "Participants from many countries can join our giveaways.",
    },
    {
      icon: <Clock size={45} className="text-red-500" />,
      title: "Fast Processing",
      description:
        "Applications are reviewed quickly and winners are announced promptly.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-5xl font-black text-green-800">
            Why Choose MBS Giveaways?
          </h2>

          <p className="text-gray-600 mt-5 text-lg">
            We provide a trusted, transparent and rewarding experience for everyone.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center"
            >

              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-green-800">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;