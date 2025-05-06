import { useState, useEffect } from "react";
import { id } from '../../utils/telegram';
import API_URL from '../../config/apiUrl';

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
  firstname: "Alexcccccc",
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
  const [tab, setTab] = useState<"activity" | "post">("activity");

  useEffect(() => {
    // Only use the id from telegram utils since username and firstname aren't used
    if (id) {
      // Kirim data ke backend untuk disimpan
      fetch(`${API_URL}/profiles/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          telegramId: id,
          username: mockUser.username, // Using mock data instead
          firstname: mockUser.firstname, // Using mock data instead
          image: mockUser.image,
          followers: mockUser.followers,
          following: mockUser.following,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Profile saved:", data);
        })
        .catch((error) => {
          console.error("Error saving profile:", error);
        });
    }
  }, [id]); // Only include id in dependencies since it's the only one used

  return (
    <div className="pb-4 bg-white rounded-lg">
      {/* Banner */}
      <div className="relative">
        <img
          src={mockUser.image}
          alt="Banner"
          className="w-full h-28 object-cover rounded-t-lg"
        />
        {/* Profile Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
          <img
            src={mockUser.image}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow"
          />
        </div>
      </div>

      {/* Space bawah untuk profil */}
      <div className="mt-12 flex flex-col items-center ">
        <h2 className="text-lg font-bold">{mockUser.firstname}</h2>
        <p className="text-sm mb-2 -mt-1">{mockUser.username}</p>
        <div className="flex space-x-6 text-sm text-gray-600 ">
          <div>
            <span className="font-bold text-black">{mockUser.followers}</span> Followers
          </div>
          <div>
            <span className="font-bold text-black">{mockUser.following}</span> Following
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-6 mb-2">
        <button
          onClick={() => setTab("activity")}
          className={`flex rounded-full items-center text-sm px-4 py-1 ${
            tab === "activity" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
          }`}
        >
          <img src="/images/activity.svg" className="w-5 h-5 mr-1" />
          Activity
        </button>
        <button
          onClick={() => setTab("post")}
          className={`flex rounded-full items-center text-sm px-4 py-1 ${
            tab === "post" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
          }`}
        >
          <img src="/images/feed2.svg" className="w-5 h-5 mr-1" />
          Posts
        </button>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-4 pb-20 px-4 border-t-2 border-blue-200 pt-4 rounded-2xl">
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
