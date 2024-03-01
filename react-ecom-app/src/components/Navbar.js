import logo from "/workspaces/Public/react-ecom-app/src/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";


function Navbar () {
    
    const [cart, setCart] = useContext(CartContext);
    const location = useLocation();
    
    
    const getCurrentPageTitle = () => {
        switch (location.pathname) {
            case "/":
                return "Home"
            case "/browse":
                return "Browse"
            case "/products":
                return "Products"
            case "/contact":
                return "Contact Us"
            case "/cart":
                return "Shopping Cart"
        }
    }



    
    return(
        <nav className="flex z-10 justify-between h-16 md:h-24 top-0 bg-black items-center border-b-2 border-red-500">
            <img src={logo} className="h-full border-r-[3px]  md:w-1/6" alt="Logo"/>
            <h1 className="text-white text-6xl font-bold absolute ml-[800px]">{getCurrentPageTitle()}</h1>
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