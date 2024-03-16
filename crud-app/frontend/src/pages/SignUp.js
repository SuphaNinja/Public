import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp () {

    const navigate = useNavigate();

    const [ registerData, setRegisterData ] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    });

    const [ error, setError ] = useState("");

    const register = async () => {
        await fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then( async (data) => {
            const response = await data.json();

            if (response.success) {
                navigate("/login");
                window.location.reload();
            } else if (response.error) {
                setError(response.error)
            } else {
                setError("Something went wrong.")
            }
        });
    };

    const handleFormChange  = (e) =>  {
        const { name, value } = e.target;
        setRegisterData((prevRegisterData) => ({
            ...prevRegisterData,
            [name]: value
        }));
    };
   



    return (
        <div className="bg-gray-300 md:py-24">
            <div className="flex flex-col md:mx-96 bg-gray-500 md:rounded-3xl  pb-12 md:pl-12">
                <h2 className="md:text-4xl text-2xl font-semibold text-white ml-2 md:ml-0 mb-2 mt-16 md:mb-8">Create new account:</h2>
                {error ? 
                    <p className="bg-red-500 p-4 text-xl rounded-xl w-72 mb-2 text-center font-semibold">{error}</p>
                    :null
                }
                <div className="flex md:gap-8 ">
                    <div className="hidden md:flex flex-col gap-2 md:gap-4 text-xl font-semibold">
                        <p className="py-2 px-4">First name: </p>
                        <p className="py-2 px-4">Last name: </p>
                        <p className="py-2 px-4">Username: </p>
                        <p className="py-2 px-4">Email: </p>
                        <p className="py-2 px-4">Password: </p>
                    </div>
                    <div className="flex flex-col w-full mx-2 md:w-[40%] gap-2 md:gap-4">
                        <input name="firstName" value={registerData.firstName} onChange={handleFormChange} placeholder="First name" type="text" className="py-2 px-4 rounded-xl border-2 border-gray-300 bg-black text-white"/>
                        <input name="lastName" value={registerData.lastName} onChange={handleFormChange} placeholder="Last name" type="text" className="py-2 px-4 rounded-xl border-2 border-gray-300 bg-black text-white"/>
                        <input name="userName" value={registerData.userName} onChange={handleFormChange} placeholder="Username" type="text" className="py-2 px-4 rounded-xl border-2 border-gray-300 bg-black text-white"/>
                        <input name="email" value={registerData.email} onChange={handleFormChange} placeholder="example@gmail.com" type="email" className="py-2 px-4 rounded-xl border-2 border-gray-300 bg-black text-white"/>
                        <input name="password" value={registerData.password} onChange={handleFormChange} placeholder="Password" type="password" className="py-2 px-4 rounded-xl border-2 border-gray-300 bg-black text-white"/>
                        <button onClick={register} onKeyDown={e => {if (e ==="Enter") {register()}}} className="px-4 py-2 bg-black text-white rounded-full font-bold text-2xl md:mx-24 hover:underline">Sign up!</button>
                    </div>
                    <div className="animate-bounce hidden md:flex sm:top-[150px] sm:ml-32 md:mt-20 md:text-4xl md:ml-8 md:w-1/3">
                        <div className="md:mt-8 flex flex-col font-bold ">
                            <p className="text-center ">Join us in our latest</p>
                            <p className="md:text-6xl ml-auto mr-auto bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">travels!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}