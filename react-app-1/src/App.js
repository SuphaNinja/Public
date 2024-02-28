import { Routes, Route } from "react-router-dom";

import { NavBar } from "./components/navbar";

import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { About } from "./pages/About"
import { Protected } from "./pages/Protected";
import { ContactUs } from "./pages/ContactUs";
import { NotFound } from "./pages/NotFound";

import { AuthContext } from "./contexts/AuthContext";
import { useState } from "react";

function App() {

  const [auth, setAuth] = useState(false);

  return (
   <AuthContext.Provider value={[auth, setAuth]}>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Browse" element={<Browse />} />
      <Route path="/About" element={<About />} />
      {auth ? 
        <Route path="/Protected" element={<Protected />} />
        :null
      }
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
   </AuthContext.Provider>
  );
}

export default App;
