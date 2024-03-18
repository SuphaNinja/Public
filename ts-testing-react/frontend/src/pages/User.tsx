
import { useQuery } from "@tanstack/react-query";
import { GetUser } from "../lib/queries/GetUser";
import { useParams } from "react-router";

export type UserDetails = {
    firstName: string;
    email: string;
    lastName: string;
    age: number;
};

export default function User() {
    const { id } = useParams();
    
    const user = useQuery<UserDetails>({
        queryKey: ["user", id],
        queryFn: () => GetUser(id),
    });

    const test = () => {
        console.log(user.data?.age)
    };
if(user.isLoading) return <h1>Loading...</h1>;
if(user.isError) return <h1>Error</h1>;

    return (
        <div className="bg-gray-500 p-60">
            <h1></h1>
            <button className="text-white text-2xl" onClick={test} >{id}</button>
            <Hello  name="sid"/>
        </div>
    )



interface HelloProps {
    name: string;

}

function Hello ({ name }: HelloProps) {
    return (
            <p className="bg-red-500 text-black p-2">Hello, {name}</p>
    )
}


}