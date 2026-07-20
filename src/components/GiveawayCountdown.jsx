import { useEffect, useState } from "react";

function GiveawayCountdown({ endDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();

      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft("Expired");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="mt-4 bg-green-100 text-green-800 rounded-lg p-3 font-semibold text-center">
      ⏳ Ends in: {timeLeft}
    </div>
  );
}

export default GiveawayCountdown;