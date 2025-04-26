// components/Comment.tsx
import { useState } from "react";
import CreateComment from "./CreateComment";

interface CommentProps {
  postId: string;
}

const Comment = ({ postId }: CommentProps) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="flex flex-col">
      <button onClick={toggleComments} className="text-blue-500">
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && (
        <div className="mt-2 space-y-2">
          <CreateComment postId={postId} />
          <div className="border-t pt-2">
            <p className="text-sm text-gray-500">No comments yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
