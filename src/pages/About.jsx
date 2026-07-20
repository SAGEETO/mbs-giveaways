import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-green-700">
              About Mohammed Bin Salman Giveaways
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              Mohammed Bin Salman Giveaways is an online platform created to
              provide people around the world with opportunities to participate
              in exciting promotional giveaways featuring cash prizes, luxury
              vehicles, smartphones, electronics, and other valuable rewards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                Our Mission
              </h2>

              <p className="text-gray-600 leading-8">
                Our mission is to create a transparent, fair, and secure
                giveaway platform where participants can apply with confidence.
                We strive to deliver a seamless experience from application to
                winner announcement.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                Our Vision
              </h2>

              <p className="text-gray-600 leading-8">
                To become one of the world's most trusted online giveaway
                platforms by providing equal opportunities, secure processes,
                and life-changing rewards to eligible participants.
              </p>
            </div>

          </div>

          <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Why Choose Us?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="border rounded-2xl p-6">
                <h3 className="font-bold text-xl text-green-700">
                  Fair Selection
                </h3>

                <p className="text-gray-600 mt-3">
                  Every application is reviewed through a transparent process.
                </p>
              </div>

              <div className="border rounded-2xl p-6">
                <h3 className="font-bold text-xl text-green-700">
                  Global Access
                </h3>

                <p className="text-gray-600 mt-3">
                  Eligible participants from different countries can apply.
                </p>
              </div>

              <div className="border rounded-2xl p-6">
                <h3 className="font-bold text-xl text-green-700">
                  Secure Platform
                </h3>

                <p className="text-gray-600 mt-3">
                  Your personal information is protected and securely managed.
                </p>
              </div>
<Footer />
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default About;