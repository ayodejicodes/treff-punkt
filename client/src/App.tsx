import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
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

function App() {
  const location = useLocation();

  const showNavBar = ["/register", "/login"].includes(location.pathname);

  const pages = ["/", "/profile", "/friends", "/chats"];
  const showleftSideBar = pages.includes(location.pathname);
  const showrightSideBar = pages.includes(location.pathname);

  return (
    <div className=" dark:bg-secondaryColor z-0">
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
            <Route path="/friends" element={<Friends />} />
            <Route path="/chats" element={<Chats />} />
          </Route>
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
