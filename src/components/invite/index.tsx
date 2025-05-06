import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { id } from "../../utils/telegram";
import API_URL from '../../config/apiUrl';
import { FaCopy, FaUserFriends, FaGift, FaHistory } from "react-icons/fa";

interface Referral {
  id: string;
  status: 'active' | 'inactive' | 'pending'; // adjust based on your actual status values
  referee: {
    username?: string;
    firstname: string;
  };
  rewardEarned: number;
}

const Invite = () => {
  const router = useRouter();
  const [referralData, setReferralData] = useState<{
    count: number;
    totalReward: number;
    referrals: Referral[];
    dailyEarnings: number;
  }>({
    count: 0,
    totalReward: 0,
    referrals: [],
    dailyEarnings: 0
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const userId = id;

  const referralLink = `https://t.me/bitMon_bot?start=${userId}`;

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const res = await fetch(`${API_URL}/referrals/${userId}`);
        const data = await res.json();

        // Calculate daily earnings from active referrals
        const daily = data.referrals
          .filter((r: Referral) => r.status === 'active')
          .length * 0.1;

        setReferralData({
          ...data,
          dailyEarnings: daily
        });
      } catch (err) {
        console.error("Failed to fetch referrals", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, [userId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4">
    <div onClick={() => router.push("/")} className="pb-4 flex space-x-2 items-center">
      <img src="/images/arrowback.svg" className="w-4 h-4" />
      <p className="text-lg"> Back </p>
    </div>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white mb-6">
        <h2 className="text-xl font-bold mb-2">Your Referral Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 bg-white bg-opacity-20 rounded-l-lg p-2 text-sm truncate"
          />
          <button
            onClick={handleCopy}
            className="bg-white text-blue-600 p-2 rounded-r-lg hover:bg-gray-100"
          >
            {copied ? 'Copied!' : <FaCopy />}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center text-gray-500">
            <FaUserFriends className="mr-2" />
            <span className="text-sm">Referrals</span>
          </div>
          <p className="text-xl font-bold mt-1">
            {loading ? '--' : referralData.count}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center text-gray-500">
            <FaGift className="mr-2" />
            <span className="text-sm">Total Earnings</span>
          </div>
          <p className="text-xl font-bold mt-1">
            {loading ? '--' : referralData.totalReward.toFixed(2)} BB
          </p>
        </div>
      </div>

      <button
        onClick={() => router.push("/leaderboard")}
        className="w-full mb-4 text-lg font-bold px-4 py-2 bg-yellow-300 border-blue-200 rounded-xl"
      >
        Leaderboard
      </button>

      {/* Daily Earnings */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <div className="flex items-center text-yellow-800">
          <FaHistory className="mr-2" />
          <span className="font-medium">Daily Earnings</span>
        </div>
        <p className="text-lg mt-1">
          +{loading ? '--' : referralData.dailyEarnings.toFixed(2)} BB/day
        </p>
        <p className="text-sm text-yellow-600 mt-1">
          Earn 0.1 BB daily for each active referral
        </p>
      </div>

      {/* Referrals List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-3">Your Referrals</h3>

        {loading ? (
          <p>Loading referrals...</p>
        ) : referralData.referrals.length === 0 ? (
          <p className="text-gray-500">No referrals yet</p>
        ) : (
          <div className="space-y-3">
            {referralData.referrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">
                    {referral.referee.username || referral.referee.firstname}
                  </p>
                  <p className={`text-xs ${
                    referral.status === 'active' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {referral.status.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    +{referral.rewardEarned.toFixed(2)} BB
                  </p>
                  {referral.status === 'active' && (
                    <p className="text-xs text-gray-500">
                      +0.1 BB daily
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Invite;
