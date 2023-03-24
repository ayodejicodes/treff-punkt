import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Profile from "./pages/profile";

function App() {
  return (
    <div className=" dark:bg-secondaryColor ">
      <div className="container flex flex-col  ">
        <NavBar />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
