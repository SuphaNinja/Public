import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { AuthProvider, useAuth } from "./contexts/AuthContext";


import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import CreatePost from "./pages/CreatePost";
import Country from "./pages/Country";
import UpdateCountry from "./pages/UpdateCountry";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import MyPosts from "./pages/MyPosts";
import DropFiles from "./pages/DropFiles";
import Testing from "./pages/Testing";
import TanStack from "./pages/TanStack";
import TanStackTest from "./pages/TanStackTest";


function App() {
  const [isLoading, setLoading] = useState(true); // Loading state
  useEffect(() => {
      // useEffect hook
      setTimeout(() => {
          // simulate a delay
          axios
              .get(
                  "https://api.slingacademy.com/v1/sample-data/photos"
              )
              .then((response) => {
                  // Get images data
                  console.log(response.data.photos);
                  setLoading(false); //set loading state
              });
      }, 400);
  }, []);
 
  if (isLoading) {
      return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
          <div className="flex items-center justify-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="text-4xl ml-4">Loading...</p>
          </div>
              {console.log("loading state")}
          </div>
      );
  }

  return (
    <main>
      
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addcountry" element={<CreatePost />} />
          <Route path="/country/:id" element={<Country />}/>
          <Route path="/update-country/:id" element={<UpdateCountry />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myposts" element={<MyPosts />} />
          <Route path="dropfiles" element={<DropFiles />} />
          <Route path="testing" element={<Testing />} />
          <Route path="tanstack" element={<TanStack />} />
          <Route path="tanstacktest" element={<TanStackTest />} />
        </Routes>
      
    </main>
  );
}

export default App;
