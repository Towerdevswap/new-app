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
            { username: "alice", reward: "+1 hash" },
            { username: "bob", reward: "+1 hash" },
            { username: "charlie", reward: "+1 hash" },
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
    <div className="p-4 bg-white rounded shadow">
    <div onClick={() => router.push("/")} className="pb-4 flex space-x-2 items-center">
      <img src="/images/arrowback.svg" className="w-4 h-4" />
      <p className="text-lg"> Back </p>
    </div>
    <div className="flex card-bg2 justify-around items-center border py-2 rounded-xl mb-4 ">
     <div className="pl-4">
     <h1 className="text-xl text-white font-bold">Invite Friens</h1>
     <p className="text-xs text-white ">Copy and share your referral link to earn more BB</p>
     </div>
     <img
     src="https://static.vecteezy.com/system/resources/thumbnails/008/486/043/small/open-gift-box-surprise-earn-point-and-get-rewards-special-offer-concept-3d-rendering-illustration-png.png"
     className="w-32 h-32" />
    </div>

    <div className="flex justify-between mb-4">
      <div className="bg-gray-200 px-4 py-2 rounded-xl flex items-center justify-between">
      <span
        onClick={() => {
          navigator.clipboard.writeText(referralLink);
          alert("Link copied!");
        }}
        className="text-lg font-bold text-center text-black cursor-pointer "
      >
        Invite Friens
      </span>

        <button
          onClick={handleCopy}
          className="text-blue-600 hover:text-blue-800 ml-2"
        >
          <FaCopy />
        </button>
      </div>
      <button
      onClick={() => router.push("/leaderboard")}
      className="text-sm font-bold  px-4 py-1 bg-yellow-300 border-blue-200 rounded-xl"
      >
      Leaderboard
      </button>
      </div>

      {copied && <p className="text-green-600 text-sm">Link copied!</p>}

      <div className="mt-2 text-center items-center border-gray-600 border px-4 py-2 rounded-xl">
      <p className="text-xs text-black ">Received rewards from friens</p>
      <h1 className="flex justify-center items-center text-xl text-black font-bold"><img src="/images/logo.png" className="h-6 w-6 mr-1" />1,020 BB</h1>
      </div>

      <div className="flex items-center space-x-2 text-gray-700 mt-4">
        <FaUserFriends className="text-lg" />
        <p className="text-sm">
          Successful Invites:{" "}
          <span className="font-semibold text-black">
            {successCount !== null ? successCount : "Loading..."}
          </span>
        </p>
      </div>

      {inviteList.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <ul className="space-y-1">
            {inviteList.map((invite, index) => (
              <li
                key={index}
                className="text-lg border p-2 rounded-xl flex items-center justify-between text-sm text-gray-800"
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
