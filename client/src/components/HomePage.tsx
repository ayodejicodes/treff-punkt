import Stories from "./Stories";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

const HomePage = () => {
  return (
    <div className="md:w-[50%] flex flex-col gap-5 p-7 bgSecondaryColorLight dark:bgWhiteColorLight rounded-xl overflow-y-scroll pageViewportHeight scrollbar dark:scrollbarDark">
      <Stories />
      <PostForm />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};
export default HomePage;
