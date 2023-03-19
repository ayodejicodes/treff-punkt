import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import Dashboard from "./pages/home";

function App() {
  return (
    <div className=" dark:bg-secondaryColor">
      <div className="container">
        <NavBar />

        <Dashboard />
      </div>
    </div>
  );
}

export default App;
