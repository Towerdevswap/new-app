import { useRouter } from "next/router";
import Tabs from "./tabs";
import Post from "./post";
import { useState } from "react";

const Home = () => {
  const [posts] = useState([
    { image: "/images/rocket.svg", id: "1", username: "@maxxi", content: "Hey!! I just purchase 100 BB", date: "2h ago", likeCount: 0, commentCount: 0, shareCount: 0 },
    { image: "/images/telegram.svg", id: "2", username: "@xblockchainer", content: "Hello, world!", date: '1day ago', likeCount: 0, commentCount: 0, shareCount: 0 },
  ]);

  const router = useRouter();

  return (
    <div className="relative min-h-screen">
      <Tabs />
      {posts.map((post) => (
        <Post
          key={post.id}
          image={post.image}
          date={post.date}
          username={post.username}
          content={post.content}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          shareCount={post.shareCount}
        />
      ))}

      {/* Tombol Fixed di pojok kanan bawah */}
      <button
        onClick={() => router.push("/createpost")}
        className="fixed bottom-20 right-4 bg-blue-500 text-2xl text-white px-6 rounded-full shadow-lg hover:bg-blue-600"
      >
        +
      </button>
    </div>
  );
};

export default Home;
