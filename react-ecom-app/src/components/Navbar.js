import logo from "/workspaces/Public/react-ecom-app/src/images/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";

function Navbar () {

    const [cart, setCart] = useContext(CartContext);
    return(
        <nav className="flex z-10 justify-between h-16 md:h-24 top-0 w-screen bg-black items-center">
            <img src={logo} className="h-full border-r-[3px]  md:w-1/6" alt="Logo"/>
            <ul className="flex flex-col items-center md:flex-row gap-6 text-white text-2xl mr-6 "> 
                <NavItem title="Home" to="/" className="transition duration-300 ease-out hover:ease-in-out hover:bg-white hover:text-black p-2 rounded-2xl  font-bold" />
                <NavItem title="Browse" to="/browse" className="transition duration-300 ease-out hover:ease-in-out hover:bg-white hover:text-black p-2 rounded-2xl" />
                <NavItem title="Products" to="/products" className="transition duration-300 ease-out hover:ease-in-out hover:bg-white hover:text-black p-2 rounded-2xl" />
                <NavItem title="Contact Us" to="/contact" className="transition duration-300 ease-out hover:ease-in-out hover:bg-white hover:text-black p-2 rounded-2xl" />
                <NavItem to="/cart" title={ cart.length === 0 ? "&#128722;" : "&#128722; (" + cart.length + ")"} className="mr-8 text-4xl transition duration-300 ease-out hover:ease-in-out hover:bg-white hover:text-black p-2 rounded-3xl pb-3 " />
                
            </ul>
        </nav>
    );
}

export default Navbar;

function NavItem ({ title, className, to }) {
    return (
        <li>
            <Link className={className} to={to} dangerouslySetInnerHTML={{ __html: title }} />
        </li>
    )
}