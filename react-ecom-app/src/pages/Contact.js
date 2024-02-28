import { useState } from "react";
import ContactImage from "../images/ContactImage.jpg"



function Contact () {

    const [submitted, setSubmitted] = useState(false);

    const [showEmptyFieldsMessage, setShowEmptyFieldsMessage] = useState(false);

    const [contactData, setContactData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

    const [submittedData, setSubmittedData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setShowEmptyFieldsMessage(false);
    };

    const handleSubmit = () => {
         // Check if any input fields are empty
         if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.phoneNumber) {
            // Set the flag to show the empty fields message
            setShowEmptyFieldsMessage(true);
            // Return early to prevent form submission
            return;
        }
        
        setSubmittedData(prevData => [...prevData, contactData]);

        setContactData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
        });
        setSubmitted(true);
    };


    return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12  bg-gray-900  px-12 py-12">
            <div className="overflow-hidden rounded-full bg-black p-2">
                <img className="w-full rounded-full h-full object-cover" src={ContactImage} />
            </div>
            <div className="bg-black rounded-full p-2">
                <div className="flex flex-col p-12 rounded-full bg-gray-300 justify-center items-center h-[50rem] gap-4 text-xl">
                <div className="">{submitted ? 
                <p className="text-green-500 font-semibold mb-2">Submitted information is displayed below.</p> :
                <p className="text-red-500 font-semibold mb-2">Please enter your information and press the submit button!</p>
                }</div>
                    <Input text="First Name :" type="text" placeholder="Joe" name="firstName" value={contactData.firstName} onChange={handleChange}/>
                    <Input text="Last Name :"type="text" placeholder="Rogan"name="lastName" value={contactData.lastName} onChange={handleChange}/>
                    <Input text="Email :" type="text" placeholder="example@gmail.com"name="email" value={contactData.email} onChange={handleChange}/>
                    <Input text="Phone Number :"  type="number" placeholder="+46 70 234 22 11"name="phoneNumber" value={contactData.phoneNumber} onChange={handleChange}/>
                    <button onClick={handleSubmit} className="p-2 text-center bg-blue-900 rounded-xl w-[10rem] mt-2">Submit!</button>
                    <div className="h-1">{showEmptyFieldsMessage && <p className="text-red-500">Please fill in all the fields.</p>}</div>
                </div>
            </div>
        </div>
        <div className="text-white p-12">{submittedData.length === 0 ? 
            <h2 className="text-4xl font-semibold">No Submitted information.</h2> 
            :
            <div>
                <h2 className="text-4xl font-semibold">Submitted information:</h2>
                <div className="flex flex-col text-xl w-2/3 gap-4">
                    {submittedData.map((data, index) => (
                        <div className="bg-gray-600 rounded-xl p-4" key={index}>
                            <p>User: {index + 1}</p>
                            <p>First Name: {data.firstName}</p>
                            <p>Last Name: {data.lastName}</p>
                            <p>Email: {data.email}</p>
                            <p>Phone Number: {data.phoneNumber}</p>
                        </div>
                    ))} 
                </div>
            </div>
       }</div>
    </div>
    )
}

export default Contact;

function Input ({ placeholder, type, text, name, value, onChange}) {

    return (
        <div className="">
            <p className="mb-2 underline text-2xl font-semibold"> {text}</p>
            <input 
            className="rounded-md text-white p-2 bg-black"
            placeholder={placeholder} 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            />
        </div>
    )
}