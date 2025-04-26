import Tabs from "./tabs";
import CreatePost from "./create";
import Post from "./post";
import { useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([
    { id: "1", username: "user1", content: "This is my first post!" },
    { id: "2", username: "user2", content: "Hello, world!" },
  ]);

  const addPost = (newPost: { id: string; username: string; content: string }) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div>
      <CreatePost addPost={addPost} /> {/* Pass addPost as prop */}
      <Tabs />
      {posts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          username={post.username}
          content={post.content}
        />
      ))}
    </div>
  );
};

export default Home;
