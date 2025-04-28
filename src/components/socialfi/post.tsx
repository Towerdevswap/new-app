interface PostProps {
  image: string;
  username: string;
  content: string;
  date: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
}

const Post = ({ image, username, content, date, likeCount, commentCount, shareCount }: PostProps) => {
  return (
    <div className="flex gap-2 border-b p-4">
      <img src={image} className="w-8 h-8 rounded-full" />
      <div className="flex-1 mb-2">
      <div className="flex justify-between">
        <div className="mb-2">
          <h3 className="text-xl font-bold">{username}</h3>
          <p className="text-xs text-gray-400 -mt-1">{date}</p>
        </div>
        <img src="/images/option.svg" className="h-8 w-8 bg-gray-100 p-1 rounded-lg"/>
        </div>
        <p className="text-gray-700">{content}</p>

        {/* Count Section */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div className="flex gap-1 items-center"><img src="/images/like.svg" className="w-5 h-5" /> {likeCount}</div>
          <div className="flex gap-1 items-center"><img src="/images/comment.svg" className="w-6 h-6" /> {commentCount}</div>
          <div className="flex gap-1 items-center"><img src="/images/logo.png" className="w-4 h-4" /> {commentCount}</div>
          <div className="flex gap-1 items-center"><img src="/images/share.svg" className="w-5 h-5" /> {shareCount}</div>
        </div>

      </div>
    </div>
  );
};

export default Post;
