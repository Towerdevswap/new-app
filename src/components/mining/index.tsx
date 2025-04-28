import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

const Mining = () => {
  // const router = useRouter();
  const [isMining, setIsMining] = useState(false); // Status lagi mining atau belum
  const [miningFinished, setMiningFinished] = useState(false); // Status mining selesai atau belum
  const [reward, setReward] = useState(0);

  // Simulasi mining selesai setelah 10 detik
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMining && !miningFinished) {
      timer = setTimeout(() => {
        setMiningFinished(true);
        setReward(7.8); // Misal setelah selesai dapet 7.8 BB
      }, 10000); // 10 detik
    }
    return () => clearTimeout(timer);
  }, [isMining, miningFinished]);

  const handleButtonClick = () => {
    if (!isMining) {
      // Mulai mining
      setIsMining(true);
      setMiningFinished(false);
      setReward(0);
    } else if (isMining && miningFinished) {
      // Klaim reward
      alert(`Kamu mengklaim ${reward} BB!`);
      setIsMining(false);
      setMiningFinished(false);
      setReward(0);
    }
  };

  const getButtonText = () => {
    if (!isMining) return "Start Mining";
    if (isMining && !miningFinished) return "Mining in Progress...";
    if (isMining && miningFinished) return "Claim Token";
    return "Start Mining";
  };

  return (
    <div>
      <div className="mt-2 p-2 justify-center rounded-xl mx-2">
        <h1 className="text-2xl justify-center flex items-center font-bold text-center text-black">
          <img src="/images/logo.png" className="h-6 w-6 mr-1" />
          {reward.toFixed(3)} BB
        </h1>
      </div>
      <div className="p-2 justify-center rounded-xl mx-2">
        <img src="/images/logo-mining.png" className="h-80 w-80 mr-1" />
      </div>
      <h1 className="text-sm text-center">+0.0000231481 BB /Per Second</h1>
      <div className="mx-4 mb-4 flex justify-between items-center border-gray-600 border px-4 py-2 rounded-xl mx-2"></div>
      <div className="flex flex-col justify-center items-center text-black text-center">
        <div className="w-10/12 gap-2 flex flex-cols-2 justify-center items-center text-black text-center">
          <button
            onClick={handleButtonClick}
            className={`${
              isMining && !miningFinished ? "bg-gray-400" : "bg-yellow-300"
            } text-black rounded-xl text-sm`}
            disabled={isMining && !miningFinished}
          >
            {getButtonText()}
          </button>
          <button
            onClick={handleButtonClick}
            className="bg-blue-100 text-black rounded-xl text-sm"
          >
            🔥Boost
          </button>
        </div>

        {/* Statistik lainnya */}
        <div className="grid grid-cols-2 gap-4 text-gray-100 w-full max-w-md mt-4 mb-20">
          <div className="flex flex-col justify-between text-sm border border-gray-500 rounded-lg p-3 ml-2">
            <span className="text-gray-600 text-left">Current Hash Rate</span>
            <span className="text-black font-semibold text-left">+0.083333 BB/hour</span>
          </div>
          <div className="flex flex-col justify-between text-sm border border-gray-500 rounded-lg p-3 mr-2">
            <span className="text-gray-600 text-left">Current Rewards</span>
            <span className="text-black font-semibold text-left">
              ${reward.toFixed(3)} BB
            </span>
          </div>
          <div className="flex flex-col justify-between text-sm border border-gray-500 shadow-md rounded-lg p-3 ml-2">
            <span className="text-gray-600 text-left">Friend Mining</span>
            <span className="text-black font-semibold text-left">12</span>
          </div>
          <div className="flex flex-col justify-between text-sm border border-gray-500 shadow-md rounded-lg p-3 mr-2">
            <span className="text-gray-600 text-left">Bonus Rates</span>
            <span className="text-black font-semibold text-left">+0.043333 BB/hour</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mining;
