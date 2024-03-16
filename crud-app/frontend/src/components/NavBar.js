import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState, useLayoutEffect } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";


export default function NavBar () {
    const [ user , fetching, error ] = useUser();
    const { loggedIn, setLoggedIn } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    const token = localStorage.getItem("token");

    

    const getCurrentPageTitle = () => {
        switch (location.pathname) {
            case "/":
                return "Home"
            case "/addcountry":
                return "Create Post"
            case "/myposts":
                return `'s Posts`
            case "/profile":
                return `'s Profile`
            case "/login":
                return "Login"
            case "/signup":
                return "Sign Up"
            case "/dropfiles":
                return "Drop Files"
        }
    }


    const logout= () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        alert("You have been logged out!")
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        if (token) {
            setLoggedIn(true);
        } else if (!token) {
            setLoggedIn(false);
        }
    }, [setLoggedIn]);

    const test = () => {
    }

    return (
        <div className="items-center flex justify-between gap-6 bg-black h-24 md:p-4">
            <Link to="/" className=" text-xl md:text-5xl ml-4 tracking-wide mr-auto bg-gradient-to-r from-blue-500 to-emerald-400 text-center inline-block text-transparent bg-clip-text font-bold"> Travel-Mania </Link>
            <h1 className="text-5xl bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent mx-auto font-serif font-extrabold">{getCurrentPageTitle()}</h1>
            <Link to="testing" className="transition transform ease-in-out duration-300 hover:text-white hover:from-blue-500 hover:to-purple-500 text-black text-xl bg-gradient-to-r from-purple-500 to-blue-500 md:px-4 py-2 rounded-xl font-semibold"> Testing </Link>
            <Link to="dropfiles" className="transition transform ease-in-out duration-300 hover:text-white hover:from-blue-500 hover:to-purple-500 text-black text-xl bg-gradient-to-r from-purple-500 to-blue-500 md:px-4 py-2 rounded-xl font-semibold"> DropFiles </Link>
            <Link to="/addcountry" className="transition transform ease-in-out duration-300 hover:text-white hover:from-blue-500 hover:to-purple-500 text-black text-xl bg-gradient-to-r from-purple-500 to-blue-500 md:px-4 py-2 rounded-xl font-semibold"> Create Post</Link>
            {loggedIn === true && fetching === false ? (
            <div className="flex gap-4 items-center">
                <Link to={"/myposts"} className="transition transform ease-in-out duration-300 hover:text-white hover:from-blue-500 hover:to-purple-500 text-black text-xl bg-gradient-to-r from-purple-500 to-blue-500 md:px-4 py-2 rounded-xl font-semibold">My posts</Link>
                <button onClick={logout} className="transition transform ease-in-out duration-300 hover:text-white hover:from-blue-500 hover:to-purple-500 text-black text-xl bg-gradient-to-r from-purple-500 to-blue-500 md:px-4 py-2 rounded-xl font-semibold">Log out</button>
                <Link to={"/profile"} className="rounded-full animate-pulse hover:animate-ping h-20 overflow-hidden">
                    <img className="h-full" src={user.user.personalData[0].profileImageUrl} alt="profile"/>
                </Link>
            </div>
            ) : (
            <div className="flex gap-4">
                <Link to="login" className="transition transform ease-in-out duration-300 hover:text-white hover:from-blue-500 hover:to-purple-500 text-black text-xl bg-gradient-to-r from-purple-500 to-blue-500 md:px-4 py-2 rounded-xl font-semibold">Login</Link>
                <Link to="signup" className="transition transform ease-in-out duration-300 hover:text-white hover:from-blue-500 hover:to-purple-500 text-black text-xl bg-gradient-to-r from-purple-500 to-blue-500 md:px-4 py-2 rounded-xl font-semibold">Sign up</Link>
            </div>
            )}
        </div>
    )
}