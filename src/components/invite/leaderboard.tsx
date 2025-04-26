import { useEffect, useState } from "react";

type User = {
  rank: number;
  username: string;
  rewards: number; // dalam BB
};

const dummyData: User[] = [
  { rank: 1, username: "KingBull", rewards: 1200 },
  { rank: 2, username: "CryptoQueen", rewards: 950 },
  { rank: 3, username: "BullMaster", rewards: 850 },
  { rank: 4, username: "FastTrader", rewards: 800 },
  { rank: 5, username: "LuckyBull", rewards: 750 },
];

const LeaderboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulasi fetching data
    setTimeout(() => {
      setUsers(dummyData);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-white p-2">
      <h1 className="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Rewards</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {users.map((user) => (
              <tr key={user.rank} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4">{user.rank}</td>
                <td className="py-3 px-4">@{user.username}</td>
                <td className="py-3 px-4">{user.rewards} $BB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
