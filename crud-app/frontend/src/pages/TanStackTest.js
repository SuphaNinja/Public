import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreatePost } from "../lib/mutations/CreatePost";


export default function TanStackTest() {

    const [ formData, setFormData ] = useState({
        title: "",
        description: "",
        imageUrl: "",
    })

    const newPost = useMutation({
        mutationFn: () => CreatePost({formData, token: localStorage.getItem("token")}),

        
    }) ;
    const test = () => {
        console.log(newPost)
    }
    
    return (
        <div className="">
            <button className="text-4xl text-black" onClick={test}>test</button>
           <div className="flex flex-col mt-12 gap-2 items-center justify-center">
                <h1 className="text-2xl">Edit Post</h1>
                {newPost.isLoading ? <h1 className="bg-blue-500 rounded-full text-xl p-4">Updating...</h1> : null}
                {newPost.isSuccess ? <h1 className="bg-green-500 rounded-full text-xl p-4">{newPost.data.success}</h1> : null}
                {newPost.isError ? <h1 className="bg-red-500 rounded-full text-xl p-4">Error updating post</h1> : null}
                <input name="imageUrl" type="text" placeholder="Image URL" className="p-2 text-white bg-black w-1/2 rounded-lg border-2 border-blue-300" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                <input name="title" type="text" placeholder="Title" className="p-2 text-white bg-black w-1/2 rounded-lg border-2 border-blue-300" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <input name="description" type="text" placeholder="Description" className="p-2 text-white bg-black w-1/2 rounded-lg border-2 border-blue-300" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <button className="bg-blue-500 text-white text-2xl px-6 py-2 rounded-xl " onClick={() => newPost.mutate()}>Update</button>
           </div>
        </div>
    )
};

