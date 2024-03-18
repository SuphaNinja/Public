import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </div>
  );  
}

export default App;
