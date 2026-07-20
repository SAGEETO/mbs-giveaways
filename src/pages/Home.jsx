import RecentWinners from "../components/RecentWinners";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import FeaturedGiveaway from "../components/FeaturedGiveaway";
import { db } from "../firebase/config";

import Newsletter from "../components/Newsletter";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Winners from "../components/Winners";
import Countdown from "../components/Countdown";
import Stats from "../components/Stats";
import GiveawayCard from "../components/GiveawayCard";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";


function Home() {

  const [giveaways, setGiveaways] = useState([]);


  useEffect(() => {

    const fetchGiveaways = async () => {

      try {

        const querySnapshot = await getDocs(
          collection(db, "giveaways")
        );


        const giveawayData = querySnapshot.docs.map((doc) => ({

          id: doc.id,
          ...doc.data()

        }));


        setGiveaways(giveawayData);


      } catch(error) {

        console.log(error);

      }

    };


    fetchGiveaways();


  }, []);



  return (

    <>

      <Navbar />

      <Hero />
<FeaturedGiveaway giveaway={giveaways[0]} />
      <Stats />

      <Countdown />


      {/* Giveaway Section */}

      <section className="bg-green-950 py-20 px-6">


        <h2 className="text-white text-4xl font-black text-center mb-12">
          Latest Giveaways
        </h2>


        <div className="max-w-6xl mx-auto">


          {giveaways.length === 0 ? (

            <p className="text-white text-center text-xl">
              No giveaways available yet
            </p>


          ) : (


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">


              {giveaways.map((giveaway)=>(

                <GiveawayCard

                  key={giveaway.id}

                  giveaway={giveaway}

                />

              ))}


            </div>


          )}


        </div>


      </section>



      <Features />
<RecentWinners />
      <Winners />

      <Testimonials />

      <FAQ />

      <Newsletter />

      <Footer />


    </>

  );

}


export default Home;