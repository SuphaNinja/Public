import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GetPosts } from "../lib/queries/GetPosts";
import { useQuery } from "@tanstack/react-query";

export default function Home () {
    const token = localStorage.getItem("token");
    const [ error, setError ] = useState("");

    const [ userData, setUserData ] = useState(null);

    const  { loggedIn, setLoggedIn }  = useAuth();

    
    const { data: posts, isLoading, isError } = useQuery({
        queryKey: "posts",
        queryFn: GetPosts
    });

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:4000/get-current-user", {
                method: "GET",
                headers: {
                    "x-access-token": token
                }
            });
            const data = await response.json();
            setUserData(data); // Update userData with fetched data
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data. Please try again later.");
        } finally {
           
        }
    };

    useEffect(() => {
        if (token) {
            setLoggedIn(true);
        }

    }, [setLoggedIn]);

    useEffect(() => {
        getUser();
    }, []);

    const test = () => { 
        console.log(posts)
        
    };


if (!isLoading) {
    return (
        <div className="h-screen pt-12 px-12 text-center bg-gradient-to-br from-emerald-500 to-cyan-500 to-60% from-20%">
            {loggedIn ?
            <div>
            <h2 className="text-4xl mb-6 font-bold underline">Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                    <div key={index} className="flex flex-col border-2 border-black gap-4 bg-black text-black rounded-3xl overflow-hidden">
                        <img src={post.imageUrl} className="w-full object-cover h-60 " alt="nothing"/>
                        <div className="flex">
                            <h3 className="font-semibold text-3xl ml-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-center inline-block text-transparent bg-clip-text">{post.title}</h3>
                            <h3 className=" font-semibold text-3xl ml-auto mr-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-center inline-block text-transparent bg-clip-text">{post.userName}</h3>
                        </div>
                        <Link to={"/country/" + post.id} className="transition transform ease-in-out duration-300 hover:text-white hover:to-cyan-400 hover:from-purple-500 text-xl px-4 bg-gradient-to-r from-cyan-400 to-purple-500 py-2 text-black rounded-b-xl text-center">
                            View post!
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
            :
            <div className="flex w-[92vw] h-[100vh] justify-center ">
                <Link to="/login" className="mt-12 animate-pulse mb-auto transition hover:underline transform ease-in-out duration-300 hover:text-white hover:to-cyan-400 hover:from-purple-500 text-5xl px-16 bg-gradient-to-r from-cyan-400 to-purple-500 py-8 text-black rounded-xl text-center">Login to view posts</Link>
            </div>
            }
        </div>
    )
}}