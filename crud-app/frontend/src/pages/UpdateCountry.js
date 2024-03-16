import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"



export default function UpdateCountry () {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ country, setCountry ] = useState({});

    const updateCountry = async () => {

        await fetch("http://localhost:4000/update-country/" +id, {
            method: "PATCH",
            body: JSON.stringify(country),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (data) => {
            const response = await data.json();

            if (response.success) {
                navigate("/country/" +id);
            }
        });
    };

    const handleFormChange = (e) => { 
        const { name, value } = e.target;
        setCountry((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    useEffect(() => {

        const getCountry = async () => {
            await fetch("http://localhost:4000/get-country/" +id)
            .then(async (data) => {
                const response = await data.json();
                setCountry(response);
            });
        };
        getCountry();

    }, []);




    return (
        <div className="flex flex-col gap-4 pt-8 mx-24">
            <h2 className="text-2xl font-semibold">Update {country.name}</h2>
           
            <input name="name" value={country.name} onChange={handleFormChange} placeholder="Country Name" className="p-2 border-2 border-gray-200 rounded-xl"/>
            <input name="description" value={country.description} onChange={handleFormChange} placeholder="Description" className="p-2 border-2 border-gray-200 rounded-xl"/> 
            <input name="imageUrl" value={country.imageUrl} onChange={handleFormChange} placeholder="Image URL" className="p-2 border-2 border-gray-200 rounded-xl"/>
            <button onClick={updateCountry} className="bg-gradient-to-r from-purple-500 to-red-500 px-4 py-2 text-white rounded-xl hover:bg-gradient-to-l ease-in-out transition-duration-300 w-[20%]">Update country!</button>
        </div>
    )
}