import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { id } from "../../utils/telegram";
import API_URL from '../../config/apiUrl';

type LeaderboardItem = {
  rank: number;
  firstname: string;
  username: string;
  reward?: number;
  invited?: number;
};

const LeaderboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bonus' | 'invited'>('bonus');
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [userPosition, setUserPosition] = useState({
    bonus: { rank: 0, reward: 0 },
    invited: { rank: 0, count: 0 }
  });
  const [loading, setLoading] = useState(true);
  const userId = id; // Ganti dengan ID user sebenarnya

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch leaderboard based on active tab
        const res = await fetch(`${API_URL}/leaderboard/by-${activeTab}`);
        const data = await res.json();
        setLeaderboard(data.leaderboard);

        // Fetch user position
        const posRes = await fetch(`${API_URL}/leaderboard/user-position/${userId}`);
        const posData = await posRes.json();
        setUserPosition(posData.data);

      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, userId]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600"
        >
          <img src="/images/arrowback.svg" className="w-4 h-4 mr-1" />
          Back
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('bonus')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'bonus'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            By Bonus
          </button>
          <button
            onClick={() => setActiveTab('invited')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'invited'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            By Invited
          </button>
        </div>
      </div>

      {/* User Position Card */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">Your Position</h3>
            <p className="text-sm text-gray-600">
              {activeTab === 'bonus'
                ? `Rank #${userPosition.bonus.rank}`
                : `Rank #${userPosition.invited.rank}`}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold">
              {activeTab === 'bonus'
                ? `${userPosition.bonus.reward} BB`
                : `${userPosition.invited.count} users`}
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-right">
                {activeTab === 'bonus' ? 'Reward (BB)' : 'Invited'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : leaderboard.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center">
                  No data available
                </td>
              </tr>
            ) : (
              leaderboard.map((item) => (
                <tr key={item.rank} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.rank}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="ml-2">
                        <p className="font-medium">{item.firstname}</p>
                        <p className="text-sm text-gray-500">@{item.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold">
                    {activeTab === 'bonus'
                      ? `${item.reward?.toFixed(2)} BB`
                      : item.invited}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
