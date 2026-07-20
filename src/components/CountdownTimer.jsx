import { useEffect, useState } from "react";

function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const end = new Date(deadline).getTime();
      const now = new Date().getTime();

      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        });

        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) /
          (1000 * 60)
        ),
        seconds: Math.floor(
          (distance % (1000 * 60)) /
          1000
        ),
        expired: false,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);
  if (timeLeft.expired) {
    return (
      <div className="bg-red-600 text-white rounded-2xl p-6 text-center shadow-lg">
        <h2 className="text-2xl font-bold">
          Giveaway Closed
        </h2>

        <p className="mt-2">
          This giveaway has ended.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-800 to-green-700 rounded-2xl p-6 shadow-xl">

      <h2 className="text-white text-2xl font-bold text-center mb-6">
        Time Remaining
      </h2>

      <div className="grid grid-cols-4 gap-4">

      <div className="bg-white rounded-xl p-4 text-center">
          <h3 className="text-4xl font-black text-green-900">
            {timeLeft.days}
          </h3>

          <p className="text-gray-600 font-semibold mt-2">
            Days
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 text-center">
          <h3 className="text-4xl font-black text-green-900">
            {timeLeft.hours}
          </h3>

          <p className="text-gray-600 font-semibold mt-2">
            Hours
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 text-center">
          <h3 className="text-4xl font-black text-green-900">
            {timeLeft.minutes}
          </h3>

          <p className="text-gray-600 font-semibold mt-2">
            Minutes
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 text-center">
          <h3 className="text-4xl font-black text-green-900">
            {timeLeft.seconds}
          </h3>

          <p className="text-gray-600 font-semibold mt-2">
            Seconds
          </p>
        </div>
        </div>

      <div className="mt-6 text-center">
        <p className="text-green-100 text-sm">
          Hurry! Applications close when the countdown reaches zero.
        </p>
      </div>

    </div>
  );
}
export default CountdownTimer;