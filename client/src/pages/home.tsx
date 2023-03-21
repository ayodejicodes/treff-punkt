import PostArea from "../components/PostArea";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";

const Home = () => {
  return (
    <div className="h-fit ">
      <div className="container flex flex-col md:flex-row  gap-6 pb-6">
        <LeftSideBar />
        <PostArea />
        <RightSideBar />
      </div>
    </div>
  );
};
export default Home;
