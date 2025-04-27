import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Mining = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();

      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        // Pastikan username dan photo_url bukan undefined
        setUsername(user.username || null);  // Jika username tidak ada, set null
        setProfilePic(user.photo_url || null); // Jika photo_url tidak ada, set null
      }
    }
  }, []);

  return (
    <div>
    <div className="flex mt-2 justify-between items-center text-black border border-gray-500 p-2 rounded-xl mx-2">
    <div className="flex items-center">
      <img
        src={profilePic || "/images/avatar-placeholder.jpg"}
        className="h-10 w-10 rounded-full mr-2"
      />
      <div>
        <p className="text-xl">{username || "Username"}</p>
        <p className="text-sm">🪙 200.00 BB</p>
      </div>
    </div>
    <button
      onClick={() => router.push("/profile")}
      className="text-xl text-black bg-transparent border-none"
    >
      <img src="/images/arrowhome.svg" className="w-6 h-6 text-lg"/>
    </button>
  </div>
    <div className="flex flex-col justify-center items-center  text-black text-center">
    <div className="my-6 glow-border rounded-full p-4 text-center bg-black/80">
      <p className="text-black">In Progress</p>
      <h1 className="text-5xl font-bold mb-6 text-black ">$0.000</h1>
      <div>
        <h1 className="text-xs font-bold mb-2 text-black ">+7.4 BB/Hour</h1>
      </div>
      <div>
        <p className="text-black">Fill In</p>
        <h1 className="text-xl font-bold text-black ">00:00:00</h1>
      </div>
    </div>


      {/* Status */}
      <button className="px-4 py-2 bg-yellow-300 text-black rounded-full text-sm">
        Claim $BB
      </button>

      {/* Statistik lainnya */}
      <div className="grid grid-cols  text-gray-100 w-full max-w-md mt-6">
        <div className="flex flex-col justify-between text-sm border border-gray-500 shadow-md  rounded-lg p-3 mx-2">
          <span className="text-gray-600">Hash Rate from Transactions</span>
          <span className="text-black font-semibold text-center">+4.2 BB/hour</span>
        </div>
      </div>

      {/* Statistik lainnya */}
      <div className="grid grid-cols-2 gap-4 text-gray-100 w-full max-w-md mt-4 mb-20 ">
        <div className="flex flex-col justify-between text-sm border border-gray-500 rounded-lg p-3 ml-2">
          <span className="text-gray-600 text-left">Current Hash Rate</span>
          <span className="text-black font-semibold text-left">+7.8 BB/hour</span>
        </div>
        <div className="flex flex-col justify-between text-sm border border-gray-500 rounded-lg p-3 mr-2">
          <span className="text-gray-600 text-left">Current Rewards</span>
          <span className="text-black font-semibold text-left">$0.000 BB</span>
        </div>
        <div className="flex flex-col justify-between text-sm border border-gray-500 shadow-md  rounded-lg p-3 ml-2">
          <span className="text-gray-600 text-left">Friend Mining</span>
          <span className="text-black font-semibold text-left">12</span>
        </div>
        <div className="flex flex-col justify-between text-sm border border-gray-500 shadow-md  rounded-lg p-3 mr-2">
          <span className="text-gray-600 text-left">Bonus Rates</span>
          <span className="text-black font-semibold text-left">+4.2 BB/hour</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Mining;
