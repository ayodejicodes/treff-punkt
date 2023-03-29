import { Routes, Route } from "react-router-dom";

import ChatsPage from "./components/Chat/ChatsPage";
// import FriendsPage from "./components/FriendsPage";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import LeftSideBar from "./components/LeftSideBar";
import NavBar from "./components/NavBar";
import RightSideBar from "./components/RightSideBar";
import Chats from "./pages/chats";
import Friends from "./pages/friends";
import Home from "./pages/home";
import Profile from "./pages/profile";

function App() {
  return (
    <div className=" dark:bg-secondaryColor ">
      <div className="container flex flex-col relative w-full">
        <NavBar />
        <LeftSideBar />
        <RightSideBar />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
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
