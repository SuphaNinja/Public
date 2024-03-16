import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";



export default function Country () {

    const navigate = useNavigate();

    const { id } = useParams();

    const [ post, setPost ] = useState({});

    

    useEffect(() => {

        const getPost = async () => {
            await fetch("http://localhost:4000/get-post/" +id)
            .then(async (data) => {
                const response = await data.json();
                setPost(response);
            });
        };
        getPost();
    }, []);


    return ( 
        <div className="flex flex-col justify-center py-8 px-24 bg-black text-white">
            <img src={post.imageUrl} className="w-full brightness-50 relative object-cover h-[85vh] rounded-xl" alt=""></img>
            <div className="absolute left-32 bottom-24">
                <h2 className="font-semibold text-6xl mb-6 ml-auto mr-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-center inline-block text-transparent bg-clip-text">{post.title}</h2>
                <p className="text-3xl">{post.description}</p>
                <p className="text-2xl mt-6">Posted by: <span className="font-semibold text-4xl ml-auto mr-4 bg-gradient-to-r from-blue-400 to-emerald-400 text-center inline-block text-transparent bg-clip-text">{post.userName}</span></p>
            </div>
            <div className="w-full text-end bg-gradient-to-r rounded-b-xl from-red-600 from-40% to-60% via-black to-emerald-500 flex">
            </div>
        </div>
    )
}