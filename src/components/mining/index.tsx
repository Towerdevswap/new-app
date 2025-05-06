import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { id } from "../../utils/telegram";
import API_URL from '../../config/apiUrl';

// Types untuk API response
interface MiningStatus {
  isMining: boolean;
  miningStartedAt: string;
  reward: number;
  miningFinished: boolean;
  referralCount: number;
  error?: string;
}

const Mining = () => {
  const [isMining, setIsMining] = useState(false);
  const [miningFinished, setMiningFinished] = useState(false);
  const [reward, setReward] = useState(0);
  const [progress, setProgress] = useState(0);
  const [miningStartedAt, setMiningStartedAt] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referralCount, setReferralCount] = useState(0);
  const router = useRouter();

  // Constants for reward calculation
  const BASE_REWARD_PER_DAY = 2; // 2 BB per 24 hours
  const REFERRAL_BONUS_PER_DAY = 0.1; // 0.1 BB per day per referral

  // 1. Load mining state dari localStorage saat komponen mount
  useEffect(() => {
    const savedMiningStart = localStorage.getItem('miningStartedAt');
    if (savedMiningStart) {
      setMiningStartedAt(new Date(savedMiningStart));
      setIsMining(true);
    }
    fetchMiningStatus(); // Initial fetch
  }, []);

  // 2. Fetch mining status dari API
  const fetchMiningStatus = useCallback(async () => {
    try {
      const userId = id;
      if (userId === null) {
        throw new Error("User ID is not available");
      }
      const res = await fetch(`${API_URL}/mining/status/${encodeURIComponent(String(userId))}`);
      const data: MiningStatus = await res.json();

      if (data.error) throw new Error(data.error);

      setIsMining(data.isMining);
      if (data.isMining && data.miningStartedAt) {
        setMiningStartedAt(new Date(data.miningStartedAt));
        localStorage.setItem('miningStartedAt', data.miningStartedAt);
      }
      setMiningFinished(data.miningFinished);
      setReward(data.reward);
      setReferralCount(data.referralCount || 0);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch mining status:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load mining data'
      );
    }
  }, [router.query.userId]);

  // Calculate current reward rate per hour
  const calculateRewardRate = () => {
    const totalDailyReward = BASE_REWARD_PER_DAY + (referralCount * REFERRAL_BONUS_PER_DAY);
    return totalDailyReward / 24; // BB per hour
  };

  // Calculate reward per second for display
  const calculateRewardPerSecond = () => {
    return calculateRewardRate() / 3600; // BB per second
  };

  // 3. Update progress bar dan reward setiap 5 detik
  const updateProgressAndReward = useCallback(() => {
    if (!miningStartedAt) return;

    const now = new Date();
    const elapsedMs = now.getTime() - miningStartedAt.getTime();
    const elapsedHours = elapsedMs / (1000 * 60 * 60);
    const percent = Math.min((elapsedMs / (24 * 60 * 60 * 1000)) * 100, 100);

    setProgress(percent);

    // Calculate current reward based on elapsed time and referral count
    const currentRewardRate = calculateRewardRate();
    const calculatedReward = elapsedHours * currentRewardRate;
    setReward(calculatedReward);

    if (percent >= 100) {
      setMiningFinished(true);
      localStorage.removeItem('miningStartedAt');
    }
  }, [miningStartedAt, referralCount]);

  // 4. Setup interval untuk auto-update
  useEffect(() => {
    const statusInterval = setInterval(fetchMiningStatus, 15000); // 15 detik
    const progressInterval = setInterval(updateProgressAndReward, 5000); // 5 detik

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, [fetchMiningStatus, updateProgressAndReward]);

  // 5. Handle tombol Start/Claim Mining
  const handleButtonClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const userId = id;
      const endpoint = !isMining ? 'start' : miningFinished ? 'claim' : null;

      if (!endpoint) {
        throw new Error('Invalid mining state');
      }

      const res = await fetch(`${API_URL}/mining/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      if (endpoint === 'start') {
        setIsMining(true);
        const startTime = new Date();
        setMiningStartedAt(startTime);
        localStorage.setItem('miningStartedAt', startTime.toISOString());
        setReward(0);
        setProgress(0);
        setMiningFinished(false);
      } else if (endpoint === 'claim') {
        alert(`Successfully claimed ${data.reward} BB!`);
        setIsMining(false);
        setMiningStartedAt(null);
        localStorage.removeItem('miningStartedAt');
        setReward(0);
        setProgress(0);
      }
    } catch (err) {
      console.error('Mining action failed:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Action failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  // 6. Handle Boost
  const handleBoostClick = () => {
    alert('Boost feature coming soon!');
  };

  // Calculate stats for display
  const rewardRatePerHour = calculateRewardRate();
  const rewardRatePerSecond = calculateRewardPerSecond();
  const estimatedDailyReward = BASE_REWARD_PER_DAY + (referralCount * REFERRAL_BONUS_PER_DAY);
  const bonusRatePerHour = referralCount * REFERRAL_BONUS_PER_DAY;

  // 7. Render UI
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center">
          <img src="/images/logo.png" className="h-6 w-6 mr-2" />
          Mining Dashboard
        </h1>
        {error && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Mining Content */}
      <div className="max-w-md mx-auto p-4">
        {/* Reward Display */}
        <div className="bg-white rounded-lg p-4 shadow mb-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Your Reward</span>
            <span className="text-xl font-bold">{reward.toFixed(6)} BB</span>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            ≈ ${(reward * 0.1).toFixed(4)} USD (example rate)
          </div>
        </div>

        {/* Mining Animation */}
        <div className="bg-white rounded-lg p-4 shadow mb-4 text-center">
          <img
            src="/images/logo-mining.png"
            className="h-48 w-48 mx-auto mb-4"
            alt="Mining Animation"
          />
          <div className="text-sm mb-2">
            {isMining
              ? `+${rewardRatePerSecond.toFixed(8)} BB/sec`
              : "Start mining to earn rewards!"}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm font-medium">
            {progress.toFixed(1)}% Complete
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={handleButtonClick}
            disabled={isLoading || (isMining && !miningFinished)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium ${
              isLoading || (isMining && !miningFinished)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-500'
            }`}
          >
            {isLoading ? 'Processing...' :
             !isMining ? 'Start Mining' :
             miningFinished ? 'Claim Reward' : 'Mining...'}
          </button>

          <button
            onClick={handleBoostClick}
            disabled={!isMining}
            className="py-2 px-4 bg-blue-100 hover:bg-blue-200 rounded-lg font-medium disabled:opacity-50"
          >
            🔥 Boost
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Hash Rate" value={`${rewardRatePerHour.toFixed(6)} BB/hour`} />
          <StatCard title="Estimated Daily" value={`${estimatedDailyReward.toFixed(3)} BB`} />
          <StatCard title="Referrals" value={referralCount.toString()} />
          <StatCard title="Bonus Rate" value={`+${bonusRatePerHour.toFixed(6)} BB/day`} />
        </div>
      </div>
    </div>
  );
};

// Komponen StatCard untuk reusable UI
const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white p-3 rounded-lg shadow">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

export default Mining;
