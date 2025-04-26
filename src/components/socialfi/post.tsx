// components/Post.tsx
import Like from "./Like";
import Comment from "./Comment";

interface PostProps {
  username: string;
  content: string;
  postId: string;
}

const Post = ({ username, content, postId }: PostProps) => {
  return (
    <div className="border-b p-4">
      <h3 className="font-bold">{username}</h3>
      <p className="text-gray-700">{content}</p>
      <div className="flex justify-between items-center mt-2">
        <Like postId={postId} />
        <Comment postId={postId} />
      </div>
    </div>
  );
};

export default Post;
