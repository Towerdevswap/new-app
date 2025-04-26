// components/Like.tsx
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

interface LikeProps {
  postId: string;
}

const Like = ({ postId }: LikeProps) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    console.log(liked ? "Unliked post" : "Liked post", postId);
  };

  return (
    <button onClick={handleLike} className="flex items-center">
      <FaHeart className={`mr-2 ${liked ? "text-red-500" : "text-gray-500"}`} />
      {liked ? "Liked" : "Like"}
    </button>
  );
};

export default Like;
