import { useState } from "react"
import { Link } from "react-router-dom";

export default function CreatePost () {
    const token = localStorage.getItem("token")
    const [ newPost, setNewPost ] = useState({
        title: "",
        description: "",
        imageUrl: ""
    });

    const [ success, setSuccess] = useState("");
    const [ error, setError ] = useState("");

    const handleFormChange = (e) => { 
        const { name, value } = e.target;
        setNewPost((prevNewPost) => ({
            ...prevNewPost,
            [name]: value
        }));
    };

    const createPost = async () => {
        await fetch("http://localhost:4000/create-post", {
            method:"POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        })
        .then(async (data) => {
            const response = await data.json();

            if(response.success) {
                setSuccess(response.success);
                setNewPost({
                    title: "",
                    description: "",
                    imageUrl: ""
                })
            } else if (response.error) {
                setError(response.error);
            }
        });
    };


if (token) {

    return (
        <div className="flex flex-col gap-4 pt-8 mx-24">
            <h2 className="text-xl">Create new post</h2>
            {success ? 
                <p className="bg-emerald-500 text-white rounded-xl p-4">{success}</p>
                : null 
            } {error ? 
                <p className="bg-red-500 text-white rounded-xl p-4">{error}</p>
                :null
            }
            <input name="title" value={newPost.title} onChange={handleFormChange} placeholder="Post title" className="p-2 border-2 border-gray-200 rounded-xl"/>
            <input name="description" value={newPost.description} onChange={handleFormChange} placeholder="Description" className="p-2 border-2 border-gray-200 rounded-xl"/> 
            <input name="imageUrl" value={newPost.imageUrl} onChange={handleFormChange} placeholder="Image URL" className="p-2 border-2 border-gray-200 rounded-xl"/>
            <button onClick={createPost} className="bg-gradient-to-r from-purple-500 to-red-500 px-4 py-2 text-xl text-white rounded-xl hover:bg-gradient-to-l ease-in-out transition-duration-300 w-[20%]">Create post!</button>
        </div>
    )
} else {
    return (
        <div className="flex flex-col gap-12 items-center w-full pt-60 bg-gradient-to-br from-emerald-500 to-cyan-500 to-60% from-20% h-screen ">
            <h2 className="text-6xl">You need to be logged in to create a post.</h2>
            <Link to="/login" className="text-6xl bg-gradient-to-r from-purple-500 to-red-500 hover:animate-pulse px-8 pt-2 pb-4 w-1/4 hover:underline font-extrabold text-center text-white rounded-xl hover:bg-gradient-to-l ease-in-out transition-duration-300">Log in</Link>
        </div>
    )
}



}