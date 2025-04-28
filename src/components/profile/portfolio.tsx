import React from "react";
import { useRouter } from "next/router";

interface PortfolioProps {
  balance?: number;
}

const Portfolio: React.FC<PortfolioProps> = ({ balance = 0 }) => {
  const router = useRouter();

  const handleConvert = () => {
    router.push("/convert");
  };

  // Dummy data aktivitas rewards
  const activities = [
    { id: 1, title: "Daily Check-in Reward", amount: "+5 BB", date: "2025-04-25" },
    { id: 2, title: "Referral Bonus", amount: "+10 BB", date: "2025-04-24" },
    { id: 3, title: "Trade Reward", amount: "+2 BB", date: "2025-04-23" },
  ];

  return (
    <div className="p-6 bg-white">
    <div onClick={() => router.push("/")} className="pb-4 flex space-x-2 items-center">
      <img src="/images/arrowback.svg" className="w-4 h-4" />
      <p className="text-lg"> Back </p>
    </div>
      <h2 className="text-xl font-bold mb-4">My Rewards Portfolio</h2>

      <div className="p-4 border border-gray-200 rounded-xl mb-4">
      <div className="mb-6">
        <p className="text-gray-500">Balance</p>
        <p className="text-3xl font-semibold">${balance.toLocaleString()} BB</p>
      </div>

      {/* Button Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleConvert}
          className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-xl"
        >
          Convert
        </button>
      </div>
      </div>

      {/* Activities Section */}
      <div>
        <h3 className="text-lg font-bold mb-3"> Rewards Activity</h3>
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center justify-between px-3 py-1 bg-gray-100 rounded-lg">
              <div>
                <p className="font-semibold">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </div>
              <p className="font-bold text-green-600">{activity.amount}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Portfolio;
