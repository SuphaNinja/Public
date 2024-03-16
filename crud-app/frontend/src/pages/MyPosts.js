import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";


function MyPosts() {
    const token = localStorage.getItem("token");

    const [ user, fetching, error ] = useUser();

    const deletePost = async (index) => {
        try {
            await fetch(`http://localhost:4000/delete-post`, {
                method: "DELETE",
                body: JSON.stringify({ postId: user.user.posts[index].id }),
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                }
           }).then(async (data) => {
                const response = await data.json();
                if(response.success) {
                    window.location.reload();
                    alert (response.success);
                }
           });
        } catch (error) {
            
            console.error("Error deleting post:", error);
        }
           
    };

if (!fetching) {
    return (
        <div className="bg-gray-800 h-full lg:h-screen items-center justify-center text-white">
            <div className="md:grid  md:grid-cols-2 lg:grid-cols-3 flex flex-col items-center gap-4">
                {user.user.posts.length > 0 ?
                    user.user.posts.map((post, index) => (
                        <div key={index} className="lg:ml-10 bg-gradient-to-br max-w-[500px]  from-blue-500 to-red-800 md:rounded-3xl p-4 md:p-8">
                            <h1 className="text-2xl mr-12 font-semibold">{post.id + ": " + post.title}</h1>
                            <div className="md:h-[300px] w-auto">
                                <img src={post.imageUrl} alt={post.title} className="h-full w-auto rounded-xl"/>
                            </div >
                            <div className="flex justify-between mt-4">
                                <p className="text-xl font-semibold ">{post.description}</p>
                                <div className="flex flex-col ml-2">
                                    <p>Posted by User:</p>
                                    <p className="font-bold text-black"> {post.userName}</p>
                                    <div className="flex gap-2">
                                        <Link className="px-4 py-2 bg-black text-white font-bold text-center rounded-xl mt-2 hover:underline">Edit post</Link>
                                        <button onClick={() => deletePost(index)} className="px-4 py-1 bg-red-500 text-white font-bold text-center rounded-xl mt-2 hover:underline">Delete post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )) :<div className="flex flex-col w-screen items-center">
                                <h1 className="text-2xl font-semibold">You have not made any posts yet.</h1>
                                <Link to="/addcountry" className="px-4 py-2 bg-black text-white font-bold text-center rounded-xl mt-2 hover:underline">Create a post</Link>
                            </div>
                }
            </div>
        </div>
    );
} 
}
export default MyPosts;