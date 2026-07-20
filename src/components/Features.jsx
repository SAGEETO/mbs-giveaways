import { ShieldCheck, Gift, Clock3, Users } from "lucide-react";

function Features() {
  const features = [
    {
      icon: <ShieldCheck size={50} />,
      title: "Secure Platform",
      desc: "Your information is protected with modern security standards.",
    },
    {
      icon: <Gift size={50} />,
      title: "Amazing Prizes",
      desc: "Win cash rewards, electronics, luxury vehicles and more.",
    },
    {
      icon: <Clock3 size={50} />,
      title: "Fast Results",
      desc: "Winners are announced quickly after every giveaway ends.",
    },
    {
      icon: <Users size={50} />,
      title: "Trusted Community",
      desc: "Thousands of users participate in our giveaways every month.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          Why Choose Us?
        </h2>

        <p className="text-center text-gray-500 mt-4 mb-16 text-lg">
          Experience a premium giveaway platform designed for everyone.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-gray-50 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
            >
              <div className="text-green-700 mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;