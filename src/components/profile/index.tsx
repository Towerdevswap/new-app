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

type User = {
  id: number;
  image: string;
  firstname: string;
  username: string;
  followers: number;
  following: number;
  posts: Post[];
  activities: Activity[];
  isFollowing?: boolean;
};

const Profile = () => {
  const [tab, setTab] = useState<"activity" | "post">("activity");
  const [user, setUser] = useState<User>({
    id: 0,
    image: "https://i.pravatar.cc/150?img=5",
    firstname: "Alexcccccc",
    username: "@bullpad_user",
    followers: 120,
    following: 88,
    posts: [
      { id: 1, content: "Just launched my first farming pool!", timestamp: "1h ago" },
      { id: 2, content: "Earned 10k BULL from staking!", timestamp: "3d ago" },
    ],
    activities: [
      { id: 1, description: "Started following @coredev", timestamp: "2h ago" },
      { id: 2, description: "Claimed daily reward", timestamp: "1d ago" },
    ],
    isFollowing: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch profile data
        const profileResponse = await fetch(`${API_URL}/profiles/${id}`);
        const profileData = await profileResponse.json();

        // Fetch follow status
        const followStatusResponse = await fetch(`${API_URL}/follow-status/${id}/${profileData.id}`);
        const followStatus = await followStatusResponse.json();

        setUser({
          ...profileData,
          isFollowing: followStatus.isFollowing
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  const handleFollow = async () => {
    try {
      const response = await fetch(`${API_URL}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followerId: id,
          followingId: user.id
        })
      });

      const data = await response.json();
      if (data.success) {
        setUser(prev => ({
          ...prev,
          isFollowing: true,
          followers: prev.followers + 1
        }));
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(`${API_URL}/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followerId: id,
          followingId: user.id
        })
      });

      const data = await response.json();
      if (data.success) {
        setUser(prev => ({
          ...prev,
          isFollowing: false,
          followers: prev.followers - 1
        }));
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div className="pb-4 bg-gradient-to-r from-slate-100 to-gray-100 rounded-lg">
      {/* Banner */}
      <div className="relative">
        <img
          src={user.image}
          alt="Banner"
          className="w-full h-28 object-cover rounded-t-lg"
        />
        {/* Profile Image */}
        <div className="absolute top-22 transform -translate-y-1/2 ml-2">
          <img
            src={user.image}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow"
          />
        </div>
      </div>

      {/* Space bawah untuk profil */}
      <div className="mt-12 flex flex-col mx-4">
      <div className="flex justify-between mb-4">
      <div>
        <h2 className="text-lg font-bold">{user.firstname} </h2>
        <p className="text-xs ">{user.username}</p>
      </div>
      <button
            onClick={user.isFollowing ? handleUnfollow : handleFollow}
            className={`text-sm border rounded-xl px-4 py-1 absolute transform -translate-y-1/2 right-2 ${
              user.isFollowing ? 'bg-gray-200' : 'bg-yellow-300'
            }`}
          >
            {user.isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
        <div className="flex space-x-6 text-sm text-gray-600 ">
          <div>
            <span className="font-bold text-black">{user.followers}</span> Followers
          </div>
          <div>
            <span className="font-bold text-black">{user.following}</span> Following
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-6 mb-2 mx-4">
        <button
          onClick={() => setTab("activity")}
          className={`flex rounded-xl items-center text-sm px-4 py-1 ${
            tab === "activity" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
          }`}
        >
          <img src="/images/activity.svg" className="w-5 h-5 mr-1" />
          Activity
        </button>
        <button
          onClick={() => setTab("post")}
          className={`flex rounded-xl items-center text-sm px-4 py-1 ${
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
          user.activities.length > 0 ? (
            user.activities.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center border shadow-md p-3 rounded text-sm">
                <p>{activity.description}</p>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No recent activity.</p>
          )
        ) : user.posts.length > 0 ? (
          user.posts.map((post) => (
            <div key={post.id} className="flex justify-between items-center border shadow-md p-3 rounded text-sm">
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
