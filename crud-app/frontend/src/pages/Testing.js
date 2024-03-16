import { useState, useEffect, useLayoutEffect, useRef, useReducer, useMemo, useCallback, useImperativeHandle } from "react";
import UseEmojis from "../Hooks/UseEmojis";
import { useUser } from "../contexts/UserContext";

const backgroundReducer = (state, action) => {
    switch(action) {
        case "red":
            return "#ef4444";
        case "blue":
            return "#3b82f6";
        case "green":
            return "#10b981";
        default:
            return "eab308";
    }
};

export default function Testing() {
    const [ user, fetching, error ] = useUser();
    const [ count, setCount ] = useState(0);
    const [ emojis, setEmojis ] = UseEmojis([]);
    const [ emoji, setEmoji ] = useState('');

    const [ backgroundColor, dispatch ] = useReducer(backgroundReducer, "red");

    const expensiveValue = useMemo(() => {
        
        return 4*1000;
        
    },[]);
    const test = () => {
        console.log(user);
    }

    const buttonRef = useRef();

    const buttonClick = () => {

        buttonRef.current.innerText = 123;

        dispatch("green");

        setCount((prevcount) => prevcount + 1);
    };

    useEffect(() => {
        const index = Math.floor(Math.random() * emojis.length);
        setEmoji(emojis[index]);
    }, [count]);

   if (!fetching) { 
    return (
        <div className="bg-green-500 py-12  flex justify-center">
            <div className="flex flex-col gap-4 text-center">
                <h1 className="text-2xl">{emoji}</h1>
                <h1 className="text-2xl">{count}</h1>
                <button style={{ backgroundColor: backgroundColor }} ref={buttonRef} onClick={test} className="bg-cyan-500 p-4 rounded-xl">Increment</button>
                <p>{user.user.posts[0].title}</p>
            </div>
        </div>
    )
}}