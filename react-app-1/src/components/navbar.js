import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function NavBar () {

    const [auth, setAuth] = useContext(AuthContext)

    return(
    <>
    <nav className="flex items-center bg-blue-700 text-white p-4 text-xl">
      <ul className="flex flex-col md:flex-row gap-6">
        <NavItem title="Home" to="/" className="bg-gray-300 transition duration-300 ease-out hover:ease-in-out hover:bg-gray-600 hover:text-red-600 p-2 rounded-2xl text-black font-bold cursor-pointer" />
        <NavItem title="Browse" to="/browse" className="bg-gray-300 transition duration-300 ease-out hover:ease-in-out hover:bg-gray-600 hover:text-red-600 p-2 rounded-2xl text-black font-medium cursor-pointer" />
        <NavItem title="About" to="/about" className="bg-gray-300 transition duration-300 ease-out hover:ease-in-out hover:bg-gray-600 hover:text-red-600 p-2 rounded-2xl text-black font-medium cursor-pointer" />
        {auth ?
            <NavItem title="Protected" to="/protected" className="bg-gray-300 transition duration-300 ease-out hover:ease-in-out hover:bg-gray-600 hover:text-red-600 p-2 rounded-2xl text-black font-medium cursor-pointer" />
            :null
        }
        <NavItem title="Contact Us" to="/contactus" className="bg-gray-300 transition duration-300 ease-out hover:ease-in-out hover:bg-gray-600 hover:text-red-600 p-2 rounded-2xl text-black font-medium cursor-pointer" />
      </ul>
   </nav>
   </>
    );
}

function NavItem ({ title, className, to } ) {
    return (
        <li>
            <Link className={className} to={to}>
                {title}
            </Link>
        </li>
    )
}

export { NavBar };