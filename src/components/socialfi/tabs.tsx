// components/Tabs.tsx
import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("justNow");

  return (
    <div className="flex justify-around p-4 border-b">
      <button
        className={`px-2 py-1 ${activeTab === "justNow" ? "bg-blue-500 text-white" : "text-gray-700"}`}
        onClick={() => setActiveTab("justNow")}
      >
        Just Now
      </button>
      <button
        className={`px-2 py-1 ${activeTab === "following" ? "bg-blue-500 text-white" : "text-gray-700"}`}
        onClick={() => setActiveTab("following")}
      >
        Following
      </button>
      <button
        className={`px-2 py-1 ${activeTab === "trending" ? "bg-blue-500 text-white" : "text-gray-700"}`}
        onClick={() => setActiveTab("trending")}
      >
        Trending
      </button>
    </div>
  );
};

export default Tabs;
