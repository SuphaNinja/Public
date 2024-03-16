import { useState } from "react"
import { useNavigate } from "react-router-dom"



export default function Login () {
    const navigate = useNavigate();

    const [ loginData, setLoginData ] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const [ error, setError ] = useState("");

    const login = async () => {
        await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then( async (data) => {
            const response = await data.json();

            if (response.token) {
                navigate("/");
                window.location.reload();
                localStorage.setItem("token", response.token);
            } else if (response.error) {
                setError(response.error)
            } else {
                setError("Something went wrong, please try again later.")
            }
        });
    };

    const handleFormChange  = (e) =>  {
        const { name, value } = e.target;
        setLoginData((prevLoginData) => ({
            ...prevLoginData,
            [name]: value
        }));
    };

    return (
        <div className="h-screen bg-gradient-to-br from-emerald-500 to-cyan-500 to-60% from-20% py-24">
            <div className="flex flex-col mx-96 bg-gray-500 rounded-3xl py-12 pl-12 ">
                <h2 className="text-4xl font-semibold text-white mb-8">Login to your account:</h2>
                {error ? 
                    <p className="bg-red-500 p-4 text-xl rounded-xl w-72 mb-2 text-center font-semibold">{error}</p>
                    :null
                }
                <div className="flex gap-8 ">
                    <div className="flex flex-col gap-4 text-xl font-semibold">
                        <p className="py-2 px-4">Username: </p>
                        <p className="py-2 px-4">Email: </p>
                        <p className="py-2 px-4">Password: </p>
                    </div>
                    <div className="flex flex-col w-[40%]  gap-4">
                        <input name="userName" value={loginData.userName} onChange={handleFormChange} placeholder="Username_123" type="text" className="py-2 px-4 rounded-xl border-2 border-gray-300 bg-black text-white"/>
                        <input name="email" value={loginData.email} onChange={handleFormChange} placeholder="example@gmail.com" type="email" className="py-2 px-4 rounded-xl border-2 border-gray-300 bg-black text-white"/>
                        <input name="password" value={loginData.password} onChange={handleFormChange} placeholder="Password" type="password" className="py-2 px-4 rounded-xl border-2 border-gray-300 bg-black text-white"/>
                        <button onClick={login} onKeyDown={e => {if (e ==="Enter") {login()}}} className="px-4 py-2 bg-black text-white rounded-full font-bold text-2xl mx-24 hover:underline">Login!</button>
                    </div>
                    <div className="animate-bounce text-4xl ml-8 w-1/3">
                        <div className="mt-8 font-bold text-clip">
                            <p className="text-center ">See our latest <span className="text-6xl ml-auto mr-auto bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">travels!</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}