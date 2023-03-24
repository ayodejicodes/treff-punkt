import PostArea from "../components/PostArea";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";

const Home = () => {
  return (
    <div className="pageViewportHeight overflow-y-hidden mt-2 mb-4">
      <div className="container containerPadding  flex flex-col md:flex-end md:flex-row  gap-6 ">
        <LeftSideBar />
        <PostArea />
        <RightSideBar />
      </div>
    </div>
  );
};
export default Home;
