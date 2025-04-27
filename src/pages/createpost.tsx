import { useState } from "react";
import CreateComponent from "../components/socialfi/create";

export default function Create() {
  const [posts, setPosts] = useState([
    // Contoh post awal
    { id: "1", username: "@maxxi", content: "Hello World!" },
  ]);

  // Fungsi untuk menambahkan post baru
  const addPost = (newPost: { id: string; username: string; content: string }) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <>
      <CreateComponent addPost={addPost} />
      {/* Tampilkan semua posts untuk pengujian */}
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.username}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
