import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCopy, FaUserFriends, FaGift } from "react-icons/fa";

const mockUserId = "123456789";
const BASE_URL = "https://t.me/your_bot?start=";

const Invite = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [successCount, setSuccessCount] = useState<number | null>(null);
  const [inviteList, setInviteList] = useState<
    { username: string; reward: string }[]
  >([]);

  const referralLink = `${BASE_URL}${mockUserId}`;

  useEffect(() => {
    // Simulasi fetch data dari backend
    const fetchData = async () => {
      try {
        // Simulasi count
        setTimeout(() => {
          setSuccessCount(3);
          setInviteList([
            { username: "@alice", reward: "+1 hash" },
            { username: "@bob", reward: "+1 hash" },
            { username: "@charlie", reward: "+1 hash" },
          ]);
        }, 500);
      } catch (err) {
        console.error("Failed to fetch invite data", err);
        setSuccessCount(0);
        setInviteList([]);
      }
    };

    fetchData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Invite & Earn</h2>
      <button
      onClick={() => router.push("/leaderboard")}
      className="text-sm font-bold  bg-yellow-300 border-blue-200 rounded-xl"
      >
      Leaderboard
      </button>
    </div>

      <div className="bg-gray-100 p-3 rounded flex items-center justify-between">
        <span className="text-sm break-all">{referralLink}</span>
        <button
          onClick={handleCopy}
          className="text-blue-600 hover:text-blue-800 ml-2"
        >
          <FaCopy />
        </button>
      </div>

      {copied && <p className="text-green-600 text-sm">Link copied!</p>}

      <div className="flex items-center space-x-2 text-gray-700">
        <FaUserFriends className="text-xl" />
        <p className="text-lg">
          Successful Invites:{" "}
          <span className="font-semibold text-black">
            {successCount !== null ? successCount : "Loading..."}
          </span>
        </p>
      </div>

      {inviteList.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold mb-2">Invited Users</h3>
          <ul className="space-y-1">
            {inviteList.map((invite, index) => (
              <li
                key={index}
                className="text-lg flex items-center justify-between text-sm text-gray-800"
              >
                <span className="text-lg">{invite.username}</span>
                <span className="text-green-600 flex items-center gap-1">
                  <FaGift className="text-lg" /> {invite.reward}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Invite;
