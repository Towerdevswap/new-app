import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Day = {
  day: number;
  reward: string;
  claimed: boolean;
};

const initialDays: Day[] = [
  { day: 1, reward: "+10 Hash", claimed: false },
  { day: 2, reward: "+15 Hash", claimed: false },
  { day: 3, reward: "+20 Hash", claimed: false },
  { day: 4, reward: "+25 Hash", claimed: false },
  { day: 5, reward: "+30 Hash", claimed: false },
  { day: 6, reward: "+35 Hash", claimed: false },
  { day: 7, reward: "+50 Hash", claimed: false },
];

const DailyBonus = () => {
  const [days, setDays] = useState<Day[]>(initialDays);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [lastClaimedTime, setLastClaimedTime] = useState<number | null>(null);
  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    const savedData = localStorage.getItem("dailyBonus");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setDays(parsed.days);
      setCurrentDay(parsed.currentDay);
      setLastClaimedTime(parsed.lastClaimedTime);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "dailyBonus",
      JSON.stringify({ days, currentDay, lastClaimedTime })
    );
  }, [days, currentDay, lastClaimedTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lastClaimedTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const diff = 24 * 60 * 60 * 1000 - (now - lastClaimedTime);
        if (diff > 0) {
          setCooldown(diff);
        } else {
          setCooldown(0);
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lastClaimedTime]);

  const handleClaim = () => {
    if (cooldown > 0 || currentDay > 7) return;
    const updatedDays = [...days];
    updatedDays[currentDay - 1].claimed = true;
    setDays(updatedDays);
    setCurrentDay(currentDay + 1);
    setLastClaimedTime(Date.now());

    if (currentDay === 7) {
      setTimeout(() => {
        // Reset semua setelah 7 hari selesai
        setDays(initialDays);
        setCurrentDay(1);
        setLastClaimedTime(null);
        localStorage.removeItem("dailyBonus");
      }, 2000); // delay 2 detik biar kelihatan efek klaim terakhir
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="px-4  max-w-md mx-auto bg-white shadow rounded-xl mt-2">
      <h2 className="text-2xl font-bold text-center mb-2">Daily Bonus</h2>

      <div className="grid grid-cols gap-2">
        {days.map((day) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: day.day * 0.1 }}
            className={`px-4 py-2 rounded-lg text-center ${
              day.claimed ? "bg-green-200" : "bg-gray-100"
            }`}
          > <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
            <div className="text-lg font-semibold">Day {day.day}</div>
            <div className="text-sm text-gray-600">{day.reward}</div>
            </div>
            <div className="mt-2 items-center">
              {day.claimed ? (
                <span className="text-green-600 font-bold">Claimed ✅</span>
              ) : (
                <span className="text-gray-400">Unclaimed</span>
              )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        {currentDay <= 7 ? (
          cooldown > 0 ? (
            <div className="text-center text-gray-500">
              Next claim in <br />
              <span className="font-bold">{formatTime(cooldown)}</span>
            </div>
          ) : (
            <motion.button
              onClick={handleClaim}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full"
            >
              Claim Day {currentDay}
            </motion.button>
          )
        ) : (
          <div className="text-green-600 font-bold text-center">
            🎉 All rewards claimed!
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyBonus;
