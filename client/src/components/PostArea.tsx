import FriendsStories from "./FriendsStories";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

const PostArea = () => {
  return (
    <div className="w-7/12 flex flex-col gap-8 p-8 bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl ">
      <FriendsStories />
      <PostForm />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};
export default PostArea;
