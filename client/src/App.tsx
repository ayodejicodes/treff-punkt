import { Routes, Route } from "react-router-dom";
// import FriendsPage from "./components/FriendsPage";

import LeftSideBar from "./components/LeftSideBar";
import NavBar from "./components/NavBar";
import RightSideBar from "./components/RightSideBar";
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
          {/* <Route path="/friends" element={<FriendsPage />} /> */}
          {/* <Route path="/chats" element={<ChatsPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
