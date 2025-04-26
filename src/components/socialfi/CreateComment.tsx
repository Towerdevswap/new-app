// components/CreateComment.tsx
import { useState } from "react";

interface CreateCommentProps {
  postId: string;
}

const CreateComment = ({ postId }: CreateCommentProps) => {
  const [comment, setComment] = useState("");

  const handleComment = () => {
    if (comment.trim()) {
      console.log("Commenting on post", postId, ":", comment);
      setComment(""); // Clear after posting
    }
  };

  return (
    <div className="flex flex-col">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleComment}
        className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
      >
        Comment
      </button>
    </div>
  );
};

export default CreateComment;
