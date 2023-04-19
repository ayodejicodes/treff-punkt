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
import SearchUserComponent from "./components/SearchUserComponent";
import { User, setKeyword } from "./features/auth/authSlice";
import { AppDispatch, RootState } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ChatAi from "./pages/chatai";

function App() {
  const location = useLocation();

  const showNavBar = ["/register", "/login"].includes(location.pathname);
  const pages = ["/", "/profile", "/friends", "/chats", "/chatsai"];
  const showleftSideBar =
    location.pathname.startsWith("/users") || pages.includes(location.pathname);
  const showrightSideBar =
    location.pathname.startsWith("/users") || pages.includes(location.pathname);

  // --------------------------------------------------------------------------------

  const { user, keyword } = useSelector((state: RootState) => state.auth);

  const token = user?.token;
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const searchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1024/api/users/?search=${keyword}`,
          config
        );
        const res = await response.data;
        setSearchResults([...res]);
      } catch (error) {
        throw new Error("Could not find Search request");
      }
    };

    searchUser();
  }, [keyword]);

  // Handles Outside box Click---------------------------------------
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(e.target as Node)
    ) {
      dispatch(setKeyword(null));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef]);

  // ----------------------------------------------------------------------

  // console.log("searchResults", searchResults);

  // ------------------------------------------------------------------------------------

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
            <Route path="/friends" element={<Friends />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chatsai" element={<ChatAi />} />
            <Route path="/users/:id" element={<GetUserProfile />} />
          </Route>
        </Routes>

        {/* -------------------------------------------------------------------------------------------------------------------------------- */}
        {keyword && (
          <div
            ref={searchBoxRef}
            className={`absolute ${
              searchResults.length == 0
                ? "top-24"
                : searchResults.length == 1
                ? "top-36"
                : "top-48 xl:top-52 "
            } hidden lg:block rounded-lg left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[36%] items-center  bg-secondaryColor text-whiteColor dark:bg-white dark:text-secondaryColor z-50`}
          >
            <p className="text-center mt-2 mb-2">{`Search Result${
              searchResults.length > 1 ? "s" : ""
            }`}</p>
            {searchResults.length === 0 && (
              <p className="text-center mb-2 text-sm">
                No Matching Result- Click outside to close Window
              </p>
            )}
            {searchResults.length > 0 && (
              <p className="text-center mb-2 text-sm">
                View Profile or Click outside to close Window
              </p>
            )}
            {searchResults
              .slice(0, 2)
              ?.map((searchResult: User, index: number) => (
                <SearchUserComponent searchResult={searchResult} key={index} />
              ))}
          </div>
        )}

        {/* ----------------------------------------------------------------------------------------------------------------------------------- */}

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
