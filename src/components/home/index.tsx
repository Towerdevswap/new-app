import { useRouter } from "next/router";

const Mining = () => {
    const router = useRouter();

  return (
    <div className="text-black">
      <div className="flex mt-2 justify-between items-center border-gray-600 border px-4 py-2 rounded-xl mx-2">
        <div className="flex items-center">
          <img
            src="/images/avatar-placeholder.jpg"
            className="h-10 w-10 rounded-full mr-2"
          />
          <div>
            <p className="text-xl">Username</p>
            <p className="text-sm">🪙 200.00 BB</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/profile")}
          className="text-xl text-gray-700 bg-transparent border-none"
        >
          <img src="/images/arrowhome.svg" className="w-6 h-6 text-lg"/>
        </button>
      </div>

      {/* Start Mining Button */}
      <div className="flex justify-between items-center text-center border-4 border-gray-700 bg-black rounded-3xl mt-4 mx-2">
        <p className="text-lg text-white py-2 px-4">
          Streak: Day 2
        </p>
        <button
        onClick={() => router.push("/dailyclaim")}
        className="text-lg text-black bg-yellow-500 py-2 px-4 rounded-2xl shadow">
          Daily Bonus
        </button>
      </div>

      {/* Featured Header */}
      <div className="flex justify-between bg-gray-200 px-4 py-2 mt-4 border rounded-xl mx-2">
        <p>Featured</p>
        <p className="text-sm text-gray-600">View more</p>
      </div>

      {/* Featured Options */}
      <div className="flex justify-around text-sm text-center pt-4 pb-2">
        {[
          { label: "Premium", image: "premium.svg" },
          { label: "Launchpad", image: "rocket.svg" },
          { label: "SocialFi", image: "feed.svg" },
          { label: "Staking", image: "earn.svg" },
        ].map(({ label, image }, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <img
              src={`/images/${image}`}
              className="h-8 w-8"
              alt={label}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-around text-sm text-center py-2">
        {[
          { label: "Referral", image: "referral.svg" },
          { label: "Revenue", image: "revenue.svg" },
          { label: "Boost", image: "boost.svg" },
          { label: "Games", image: "games.svg" },
        ].map(({ label, image }, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <img
              src={`/images/${image}`}
              className="h-8 w-8 "
              alt={label}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Quick Access Header */}
      <div className="px-4 py-2 mt-4 bg-gray-200 border rounded-xl mx-2">
        <p>Join Community</p>
      </div>
      <div className="flex justify-around text-sm text-center py-4 mb-12">
        {[
          { label: "Telegram", image: "telegram.svg" },
          { label: "Twitter", image: "twitter.svg" },
          { label: "Discord", image: "discord.svg" },
          { label: "Medium", image: "medium.svg" },
        ].map(({ label, image }, i) => (
          <div key={i} className="flex flex-col items-center space-y-1">
            <img
              src={`/images/${image}`}
              className="h-8 w-8"
              alt={label}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Mining;
