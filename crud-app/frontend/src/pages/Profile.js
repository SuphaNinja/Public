import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Profile () {
    const navigate = useNavigate();

    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ userData, setUserData ] = useState(null);
    const [ profileData, setProfileData ] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        profileImageUrl:"",
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevProfileData) => ({
            ...prevProfileData,
            [name]: value
        }));
    };

    const deleteUser = async () => {
        try {
            await fetch("http://localhost:4000/delete-user", {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token")
                }
            }).then(async (data) => {
                const response = await data.json();
                   if (response.success) {
                    navigate("/");
                    localStorage.removeItem("token");
                    window.location.reload();
                   }
            });
        } catch (error) {
            setError("Failed to delete account, try again later.");
            console.error("Error deleting profile:", error);
        }
    };
    

    const updateProfile = async () => {
        try {
            const response = await fetch("http://localhost:4000/update-current-user", {
                method: "PATCH",
                body: JSON.stringify(profileData),
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token")
                }
            });
    
            const data = await response.json();
            if (data.success) {
                console.log("Updated account", data.user);
                window.location.reload();
            } else if (data.error) {
                setError(data.error);
                console.log("Error:", data.error);
            } else {
                setError("Something went wrong, try again later");
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again later.");
        }
    };

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:4000/get-current-user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token")
                }
            });
            const data = await response.json();
            setUserData(data); // Update userData with fetched data
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const test = () => {
        console.log(userData.user.personalData[0].profileImageUrl)
    }

if (!loading) {
    return (
        <div className="bg-gray-800 p-60 pt-24 text-white">
            <div className="bg-black p-12 pt-12 mx-16 rounded-3xl">
                <div className="flex mb-8 h-52 gap-8 items-center ">
                    <h2 className="w-1/2 text-8xl break-words    font-semibold bg-gradient-to-r from-blue-400 to-emerald-400 text-center inline-block text-transparent bg-clip-text animate-bounce">{userData.user.userName}</h2>
                    <img className="h-full rounded-3xl w-1/2 object-fill" src={userData.user.personalData[0].profileImageUrl} alt={userData.user.personalData[0].profileImageUrl}/>
                </div>
                <div className="">
                    <h2 className="text-3xl mb-6 font-semibold">Update profile information:</h2>
                    {error ? 
                        <p className="bg-red-500 p-4 text-xl rounded-xl w-72 mb-2 text-center font-semibold">{error}</p>
                        :null
                    }
                   <div className="flex gap-6 ">
                        <div className="text-xl flex flex-col gap-7">
                            <p>Edit first name:</p>
                            <p>Edit last name:</p>
                            <p>Edit username:</p>
                            <p>Edit email:</p>
                        </div>
                        <div className="flex flex-col gap-4 ">
                            <input type="text" name="firstName" value={profileData.firstName} onChange={handleFormChange} placeholder={userData.user.firstName} className="py-1 px-2 rounded-xl border-2 border-blue-300 bg-black text-white"/>
                            <input type="text" name="lastName" value={profileData.lastName} onChange={handleFormChange} placeholder={userData.user.lastName} className="py-1 px-2 rounded-xl border-2 border-blue-300 bg-black text-white"/>
                            <input type="text" name="userName" value={profileData.userName} onChange={handleFormChange} placeholder={userData.user.userName} className="py-1 px-2 rounded-xl border-2 border-blue-300 bg-black text-white"/>
                            <input type="email" name="email" value={profileData.email} onChange={handleFormChange} placeholder={userData.user.email} className="py-1 px-2 rounded-xl border-2 border-blue-300 bg-black text-white"/>
                            <button onClick={updateProfile} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-3xl font-bold text-xl md:mx-24 hover:underline">Update profile</button>
                            <button onClick={deleteUser} className="px-4 py-2 bg-red-800  text-white rounded-3xl font-bold text-xl animate-pulse md:mx-24 hover:underline">Delete Profile</button>
                        </div>
                        <div className="flex flex-col gap-2 ml-12">
                            <p>Change profile picture:</p>
                            <input type="text" name="profileImageUrl" value={profileData.profileImageUrl} onChange={handleFormChange} placeholder="Enter image URL" className="py-1 px-2 rounded-xl border-2 border-blue-300 bg-black text-white"/>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    )
}}