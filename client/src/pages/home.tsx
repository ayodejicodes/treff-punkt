import PostArea from "../components/PostArea";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";

const Home = () => {
  return (
    <div className="container flex flex-col md:flex-row  gap-6 ">
      <LeftSideBar />
      <PostArea />
      <RightSideBar />
    </div>
  );
};
export default Home;
