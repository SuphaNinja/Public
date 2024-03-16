import { useState, useEffect } from "react";
import axios from "axios";


export default function DropFiles () {
    const [ loading, setLoading ] = useState(true); // Loading state
    const [ file, setFile ] = useState("");
    const [ success, setSuccess ] = useState("");
    const [ error, setError] = useState("");
    const [ pictures, setPictures ] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const getFiles = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/get-pictures");
            if(response.data) {
                setPictures(response.data);
            }
        } catch (error) {
            setError("Failed to fetch pictures, try again later.");
        } finally {
            setLoading(false);
        }
    };


    const uploadFile = async () => {

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:4000/api/upload-picture", formData, {
                header: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data.success) {
                getFiles();
                setSuccess(response.data.success);
            } else if (response.data.error) {
                setError(response.data.error);
            }
          
        } catch(error) {
            console.error("Error uploading file:", error);
            setError("Something went wrong, try again later.");
        }
    };
    useEffect(() => {
       
    getFiles();
    }, []);

    const test = () => {
        console.log(pictures);
    };

    if (!loading) {
    return (
    <div className="bg-gray-400 h-screen justify-center px-12 py-24">
        <div className="flex flex-col text-white mx-60 gap-6 items-center rounded-xl bg-gray-800 p-12">
            <h1 className="font-semibold text-2xl ">Upload an awesome image</h1>
            {success ? <p className="bg-green-500 my-4 font-semibold py-2 px-6 rounded-xl text-xl text-white">{success}</p> : null}
            {error ? <p className="bg-red-500 my-4 font-semibold py-2 px-6 rounded-xl text-xl text-white">{error}</p> : null}
            <input type="file" onChange={handleFileChange} className=""/>
            <button onClick={uploadFile} className="text-xl rounded-3xl w-1/4 bg-black px-4 py-2 mt-2">Upload!</button>
        </div>
        <div className="grid grid-cols-4 mt-12 rounded-3xl bg-slate-500">
            {pictures.length > 0 ? 
            pictures.map((picture, index) => (
                <div key={index} className="bg-gray-800 p-4 border-2 rounded-3xl m-4">
                    <img className=" border-2 border-black h-full w-full rounded-xl" src={"http://localhost:4000" + picture.filePath}/>
                </div>
                    
            )) : <p>there are no pictures</p>
            }
        </div>
    </div>
    );
    
}};

