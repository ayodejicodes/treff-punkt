import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftSideBar from "./components/Navigation/LeftSideBar";
import NavBar from "./components/Navigation/NavBar";
import RightSideBar from "./components/Navigation/RightSideBar";
import Register from "./pages/register";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Friends from "./pages/friends";
import Chats from "./pages/chats";
import Login from "./pages/login";
import PrivateRoutes from "../utils/PrivateRoutes";
import NotFound from "./pages/NotFound";
import GetUserProfile from "./pages/getUserProfile";
import ChatAi from "./pages/chatai";
import EditProfile from "./pages/editProfile";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import SearchParentComponent from "./components/Search/SearchParentComponent";

function App() {
  const location = useLocation();

  const showNavBar = ["/register", "/login"].includes(location.pathname);
  const pages = [
    "/",
    "/profile",
    "/edit-profile",
    "/friends",
    "/chats",
    "/chatsai",
  ];
  const showleftSideBar =
    location.pathname.startsWith("/users") || pages.includes(location.pathname);
  const showrightSideBar =
    location.pathname.startsWith("/users") || pages.includes(location.pathname);
  const { user, keyword } = useSelector((state: RootState) => state.auth);

  return (
    <div className="relative dark:bg-secondaryColor">
      <div className="container flex flex-col relative w-full">
        {/* ---------NavBar------------------- */}
        {!showNavBar && <NavBar />}
        {/* ---------------------------------- */}

        {/* ---------LeftSidebar-------------- */}
        {showleftSideBar && <LeftSideBar />}
        {/* ---------------------------------- */}

        {/* ---------RightSidebar------------- */}
        {showrightSideBar && <RightSideBar />}
        {/* ---------------------------------- */}

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} index />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chatsai" element={<ChatAi />} />
            <Route path="/users/:id" element={<GetUserProfile />} />
          </Route>
        </Routes>
        {keyword && <SearchParentComponent />}
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
