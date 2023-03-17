import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div className=" dark:bg-secondaryColor">
      <div className="max-w-7xl m-auto">
        <NavBar />
        <BrowserRouter>
          <Routes>{/* <Route path="/" element={<Dashboard />} /> */}</Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
