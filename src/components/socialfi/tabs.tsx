import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import ikon pencarian dari react-icons

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("justNow");

  return (
    <div className="flex justify-between px-2 space-x-1 py-4 border-b">
      <div>
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
      {/* Tombol pencarian dengan ikon */}
      <button
        className={`px-2 py-1 ${activeTab === "search" ? "bg-gray-200 text-black" : "text-gray-700"}`}
        onClick={() => setActiveTab("search")}
      >
        <FaSearch className="text-lg" />
      </button>
    </div>
  );
};

export default Tabs;
