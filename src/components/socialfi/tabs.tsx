// components/Tabs.tsx
import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("justNow");

  return (
    <div className="flex px-2 space-x-1 py-4 border-b">
      <button
        className={`px-2 py-1 ${activeTab === "justNow" ? "bg-gray-200 text-black" : "text-gray-700"}`}
        onClick={() => setActiveTab("justNow")}
      >
        Just Now
      </button>
      <button
        className={`px-2 py-1 ${activeTab === "following" ? "bg-gray-200 text-black" : "text-gray-700"}`}
        onClick={() => setActiveTab("following")}
      >
        Following
      </button>
      <button
        className={`px-2 py-1 ${activeTab === "hot" ? "bg-gray-200 text-black" : "text-gray-700"}`}
        onClick={() => setActiveTab("hot")}
      >
        Hot
      </button>
    </div>
  );
};

export default Tabs;
