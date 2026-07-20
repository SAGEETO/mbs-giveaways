import Navbar from "../components/Navbar";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-green-700">
              Contact Us
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              We'd love to hear from you. Get in touch with our support team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Contact Details */}
            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-green-700 mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">

                <div className="flex items-start gap-4">
                  <Mail className="text-green-700" size={28} />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">
                      support@mbsgiveaways.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-green-700" size={28} />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-gray-600">
                      +966 000 000 000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-green-700" size={28} />
                  <div>
                    <h3 className="font-bold">Office</h3>
                    <p className="text-gray-600">
                      Riyadh, Kingdom of Saudi Arabia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-green-700" size={28} />
                  <div>
                    <h3 className="font-bold">Working Hours</h3>
                    <p className="text-gray-600">
                      Sunday - Thursday
                    </p>
                    <p className="text-gray-600">
                      9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-3xl font-bold text-green-700 mb-8">
                Send a Message
              </h2>

              <form className="space-y-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border rounded-xl p-4"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border rounded-xl p-4"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border rounded-xl p-4"
                />

                <textarea
                  rows="6"
                  placeholder="Your Message"
                  className="w-full border rounded-xl p-4"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold transition"
                >
                  Send Message
                </button>

              </form>
<Footer />
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Contact;