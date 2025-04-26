import { useState } from "react";

// Define the type for the props the component will receive
interface CreatePostProps {
  addPost: (newPost: { id: string; username: string; content: string }) => void;
}

const CreatePost = ({ addPost }: CreatePostProps) => {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim()) {
      const newPost = {
        id: Date.now().toString(), // Generate a simple unique ID (could be improved)
        username: "user3", // You can replace this with actual user info
        content: content,
      };
      addPost(newPost); // Call the function passed via props to add the post
      setContent(""); // Clear content after post
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border rounded-2xl"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-xl"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
