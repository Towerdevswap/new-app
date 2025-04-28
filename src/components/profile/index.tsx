import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type Post = {
  id: number;
  content: string;
  timestamp: string;
};

type Activity = {
  id: number;
  description: string;
  timestamp: string;
};

const mockUser = {
  image: "https://i.pravatar.cc/150?img=5",
  username: "@bullpad_user",
  followers: 120,
  following: 88,
  posts: [
    { id: 1, content: "Just launched my first farming pool!", timestamp: "1h ago" },
    { id: 2, content: "Earned 10k BULL from staking!", timestamp: "3d ago" },
  ] as Post[],
  activities: [
    { id: 1, description: "Started following @coredev", timestamp: "2h ago" },
    { id: 2, description: "Claimed daily reward", timestamp: "1d ago" },
  ] as Activity[],
};

const Profile = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [tab, setTab] = useState<"activity" | "post">("activity");

  useEffect(() => {
    import('@twa-dev/sdk').then((WebAppModule) => {
      const WebApp = WebAppModule.default;
      if (WebApp && WebApp.initDataUnsafe) {
        const userData = WebApp.initDataUnsafe.user;
        if (userData && userData.username) { // ✅ bener
          setUsername(userData.username || null);
        }
      }
    }).catch((error) => {
      console.error("Error loading WebApp module:", error);
    });
  }, []);


  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded-lg">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-2">
        <img
          src={mockUser.image}
          alt="Profile"
          className="w-24 h-24 rounded-full shadow"
        />
        <h2 className="text-lg font-bold">{username || mockUser.username}</h2>
        <div className="flex space-x-6 text-sm text-gray-600">
          <div>
            <span className="font-bold text-black">{mockUser.followers}</span> Followers
          </div>
          <div>
            <span className="font-bold text-black">{mockUser.following}</span> Following
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around mt-6 mb-2 border-b">
        <button
          onClick={() => setTab("activity")}
          className={`flex bg-[#df92fb] rounded-full items-center text-sm px-4 py-1 ${
            tab === "activity" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
          }`}
        >
          Activity
        </button>
        <button
          onClick={() => setTab("post")}
          className={`flex bg-[#8afdff] rounded-full items-center text-sm px-4 py-1 ${
            tab === "post" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
          }`}
        >
          Posts
        </button>
        <button
        onClick={() => router.push("/portfolio")}
          className="flex bg-yellow-300 rounded-full items-center text-sm px-4 py-1"
        >
          <img src="/images/wallet2.svg" className="h-8 w-8 items-center bg-yellow-100 rounded-full" alt="Wallet" />Portfolio
        </button>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-4">
        {tab === "activity" ? (
          mockUser.activities.length > 0 ? (
            mockUser.activities.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center bg-gray-100 p-3 rounded text-sm">
                <p>{activity.description}</p>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent activity.</p>
          )
        ) : mockUser.posts.length > 0 ? (
          mockUser.posts.map((post) => (
            <div key={post.id} className="flex justify-between items-center bg-gray-100 p-3 rounded text-sm">
              <p>{post.content}</p>
              <span className="text-xs text-gray-500">{post.timestamp}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
