import { useContext, createContext, useState, useEffect, useLayoutEffect } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {

    const [ user, setUser ] = useState({});
    const [ fetching , setFetching ] = useState(true);
    const [ error, setError ] = useState("");

    return (
        <UserContext.Provider value={[ user, setUser, fetching, setFetching, error, setError]}>
            {children}
        </UserContext.Provider>
    )

};

export const useUser = () => {
   
    const contextValue = useContext(UserContext);

    if (!contextValue) {
        throw new Error("useUser must be used within a UserContextProvider");
    }

    const [user, setUser, fetching, setFetching, error, setError] = contextValue;

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getUser = async () => {
            try {
                const response = await fetch("http://localhost:4000/get-current-user", {
                    method: "GET",
                    headers: {
                        "x-access-token": token
                    }
                });
                const data = await response.json();
                setUser(data); // Update userData with fetched data
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(error);
            } finally {
                setFetching(false);
            }
        };
        if (token) {
            getUser();
        }
    }, []);

    return [user, fetching, error];
}