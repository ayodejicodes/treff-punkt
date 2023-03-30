import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftSideBar from "./components/LeftSideBar";
import NavBar from "./components/NavBar";
import RightSideBar from "./components/RightSideBar";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Friends from "./pages/friends";
import Chats from "./pages/chats";

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== "/";

  return (
    <div className=" dark:bg-secondaryColor ">
      <div className="container flex flex-col relative w-full">
        {showNavBar && <NavBar />}
        {showNavBar && <LeftSideBar />}
        {showNavBar && <RightSideBar />}

        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{ backgroundColor: "#023047", color: "white" }}
        />
      </div>
    </div>
  );
}

export default App;
