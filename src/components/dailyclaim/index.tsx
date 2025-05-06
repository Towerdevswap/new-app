import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

type Day = {
  day: number;
  reward: string;
  claimed: boolean;
  logo: string;
};

const initialDays: Day[] = [
  { day: 1, reward: "+10 Hash", claimed: false, logo: "🎁" },
  { day: 2, reward: "+15 Hash", claimed: false, logo: "💰" },
  { day: 3, reward: "+20 Hash", claimed: false, logo: "💎" },
  { day: 4, reward: "+25 Hash", claimed: false, logo: "🏆" },
  { day: 5, reward: "+30 Hash", claimed: false, logo: "👑" },
  { day: 6, reward: "+35 Hash", claimed: false, logo: "✨" },
  { day: 7, reward: "+50 Hash", claimed: false, logo: "💯" },
];

const DailyBonus = () => {
  const router = useRouter();
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

  const handleClaim = (dayNumber: number) => {
    if (cooldown > 0 || dayNumber !== currentDay) return;

    const updatedDays = days.map(day =>
      day.day === dayNumber ? {...day, claimed: true} : day
    );

    setDays(updatedDays);
    setCurrentDay(currentDay + 1);
    setLastClaimedTime(Date.now());

    if (dayNumber === 7) {
      setTimeout(() => {
        setDays(initialDays);
        setCurrentDay(1);
        setLastClaimedTime(null);
        localStorage.removeItem("dailyBonus");
      }, 2000);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Membagi days menjadi 3 kelompok: 3-3-1
  const firstGroup = days.slice(0, 3);
  const secondGroup = days.slice(3, 6);
  const thirdGroup = days.slice(6);

  return (
    <div className="max-w-md mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg">
    <div onClick={() => router.push("/")} className="pb-4 flex space-x-2 items-center">
      <img src="/images/arrowback.svg" className="w-4 h-4" />
      <p className="text-lg"> Back </p>
    </div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Daily Rewards</h2>
        <p className="text-gray-600">Claim your bonus each day!</p>
      </div>

      {/* Grup Pertama (3 petak) */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {firstGroup.map((day) => (
          <RewardCard
            key={day.day}
            day={day}
            currentDay={currentDay}
            cooldown={cooldown}
            onClaim={handleClaim}
          />
        ))}
      </div>

      {/* Grup Kedua (3 petak) */}
      <div className="grid grid-cols-3 gap-3 mb-2">
        {secondGroup.map((day) => (
          <RewardCard
            key={day.day}
            day={day}
            currentDay={currentDay}
            cooldown={cooldown}
            onClaim={handleClaim}
          />
        ))}
      </div>

      {/* Grup Ketiga (1 petak) */}
      <div className="grid grid-cols-1 gap-3 mb-2">
        {thirdGroup.map((day) => (
          <RewardCard
            key={day.day}
            day={day}
            currentDay={currentDay}
            cooldown={cooldown}
            onClaim={handleClaim}
          />
        ))}
      </div>

      {cooldown > 0 && (
        <div className="bg-white p-3 rounded-xl shadow-sm text-center">
          <div className="text-gray-600 mb-1">Next reward available in</div>
          <div className="text-xl font-mono font-bold text-blue-600">
            {formatTime(cooldown)}
          </div>
        </div>
      )}
    </div>
  );
};

// Komponen RewardCard yang terpisah
const RewardCard = ({ day, currentDay, cooldown, onClaim }: {
  day: Day;
  currentDay: number;
  cooldown: number;
  onClaim: (dayNumber: number) => void;
}) => {
  const isCurrent = day.day === currentDay && !day.claimed;
  const canClaim = isCurrent && cooldown === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: day.day * 0.1 }}
      className={`p-3 rounded-xl shadow-sm transition-all duration-300 flex flex-col items-center ${
        day.claimed
          ? "bg-gradient-to-b from-green-100 to-emerald-100 border border-green-200"
          : "bg-white border border-gray-200"
      } ${isCurrent ? "ring-2 ring-blue-400" : ""}`}
    >
      <div className="text-3xl mb-2">{day.logo}</div>
      <div className="text-center">
        <div className="font-semibold text-gray-800">Day {day.day}</div>
        <div className="text-sm text-gray-600 mb-2">{day.reward}</div>
      </div>

      {day.claimed ? (
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
          Claimed
        </span>
      ) : canClaim ? (
        <motion.button
          onClick={() => onClaim(day.day)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded-full"
        >
          Claim
        </motion.button>
      ) : (
        <span className="text-xs text-gray-500 mt-2">
          {isCurrent ? "Ready" : "Coming"}
        </span>
      )}
    </motion.div>
  );
};

export default DailyBonus;
