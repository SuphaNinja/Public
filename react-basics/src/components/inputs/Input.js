import { useState } from "react";
import "./Input.css";

function InputField (value, placeholder, type) {
    const [input, setInput] = useState("asdasd");
    return (
    <>
        <input className="main-input"  
           {...value={input}} {...placeholder} {...type}
        />
    </>
    );
};

export default InputField;