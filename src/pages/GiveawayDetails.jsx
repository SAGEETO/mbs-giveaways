import { useEffect, useMemo, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import {
  Calendar,
  Gift,
  Users,
  Share2,
  Trophy,
} from "lucide-react";

import CountdownTimer from "../components/CountdownTimer";
import { auth, db } from "../firebase/config";
import Navbar from "../components/Navbar";

function GiveawayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [giveaway, setGiveaway] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState(0);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
const countdown =
  giveaway?.endDate && new Date(giveaway.endDate) < new Date()
    ? "Ended"
    : "Active";
  useEffect(() => {
    async function loadGiveaway() {
      try {
        const giveawayRef = doc(db, "giveaways", id);
        const giveawaySnap = await getDoc(giveawayRef);

        if (giveawaySnap.exists()) {
          setGiveaway({
            id: giveawaySnap.id,
            ...giveawaySnap.data(),
          });
        }

        const applicationsQuery = query(
          collection(db, "applications"),
          where("giveawayId", "==", id)
        );

        const applicationsSnapshot = await getDocs(applicationsQuery);

        setApplicants(applicationsSnapshot.size);

        const user = auth.currentUser;

        if (user) {
          const existingApplication = applicationsSnapshot.docs.find(
            (doc) => doc.data().userId === user.uid
          );

          setAlreadyApplied(!!existingApplication);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadGiveaway();
  }, [id]);

  async function applyForGiveaway() {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    if (alreadyApplied) {
      alert("You have already applied for this giveaway.");
      return;
    }

    if (countdown === "Ended") {
      alert("This giveaway has ended.");
      return;
    }
    try {
      await addDoc(collection(db, "applications"), {
        userId: user.uid,
        userEmail: user.email,
        fullName: user.displayName || "",
        giveawayId: giveaway.id,
        giveawayTitle: giveaway.title,
        country: "",
        status: "Pending",
        appliedAt: serverTimestamp(),
      });

      setApplicants((prev) => prev + 1);
      setAlreadyApplied(true);

      alert("🎉 Application submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit application.");
    }
  }

  function shareGiveaway() {
    const shareData = {
      title: giveaway.title,
      text: `Join the ${giveaway.title} giveaway and stand a chance to win ${giveaway.prize}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);

      alert("Giveaway link copied to clipboard.");
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-green-950 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white">
            Loading Giveaway...
          </h2>
        </div>
      </>
    );
  }

  if (!giveaway) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-green-950 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white">
            Giveaway not found.
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 pt-28 pb-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl">

            <img
              src={
                giveaway.image ||
                "https://via.placeholder.com/1200x500?text=Giveaway"
              }
              alt={giveaway.title}
              className="w-full h-96 object-cover"
            />

            <div className="p-8">

              <div className="flex flex-col lg:flex-row justify-between gap-8">

              <div className="flex-1">

                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-5">
                    <Gift size={18} />
                    Active Giveaway
                  </div>

                  <h1 className="text-5xl font-black text-green-900">
                    {giveaway.title}
                  </h1>

                  <p className="text-5xl font-black text-yellow-500 mt-6">
                    {giveaway.prize}
                  </p>

                  <p className="text-gray-600 text-lg leading-8 mt-8">
                    {giveaway.description}
                  </p>

                </div>

                <div className="lg:w-96">

                  <div className="bg-green-50 rounded-2xl p-6 border border-green-200">

                    <h2 className="text-2xl font-bold text-green-800 mb-6">
                      Giveaway Details
                    </h2>

                    <div className="space-y-5">

                      <div className="flex items-center gap-3">
                        <Calendar className="text-green-700" />
                        <div>
                          <p className="text-sm text-gray-500">
                            End Date
                          </p>

                          <p className="font-bold">
                            {giveaway.endDate || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div>
  <CountdownTimer deadline={giveaway.endDate} />
</div>

                      <div className="flex items-center gap-3">
                        <Users className="text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Applicants
                          </p>

                          <p className="font-bold">
                            {applicants}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Trophy className="text-yellow-500" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Status
                          </p>

                          <p className="font-bold text-green-700">
                            {countdown}
                          </p>
                        </div>
                      </div>

                    </div>

                    <button
                      onClick={shareGiveaway}
                      className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2"
                    >
                      <Share2 size={20} />
                      Share Giveaway
                    </button>
                    <button
                      onClick={applyForGiveaway}
                      disabled={
  alreadyApplied ||
  countdown === "Ended"
}
                      className={`w-full mt-4 rounded-xl py-4 font-bold transition ${
                        alreadyApplied
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : countdown === "Ended"
                          ? "bg-red-500 cursor-not-allowed text-white"
                          : "bg-yellow-400 hover:bg-yellow-300 text-green-900"
                      }`}
                    >
                      {alreadyApplied
                        ? "Already Applied"
                        : countdown === "Ended"
                        ? "Giveaway Ended"
                        : "Apply For Giveaway"}
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default GiveawayDetails;