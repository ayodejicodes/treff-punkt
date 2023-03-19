import PostArea from "../components/PostArea";
import SideBar from "../components/SideBar";
import SideChat from "../components/SideChat";

const Dashboard = () => {
  return (
    <div className="container flex flex-col md:flex-row  gap-6 ">
      <SideBar />
      <PostArea />
      <SideChat />
    </div>
  );
};
export default Dashboard;
