import { useContext, useState } from "react"
import CartContext from "../context/CartContext"
import { useParams } from "react-router-dom";


function RemoveFromCart () {

    const { id } = useParams();
    
    function RemoveFromCart () {

        const { id } = useParams();
        
    
        
        const [removeCart, setRemoveCart] = useContext(CartContext);
    
        const removeItem = () => {
    
            const updatedCart = removeCart.filter((item) => item.id !== id);
            setRemoveCart(updatedCart);
        }
        return removeItem;
        
       
    }
    
    const [removeCart, setRemoveCart] = useContext(CartContext);

    const removeItem = () => {

        const updatedCart = removeCart.filter((item) => item.id !== id);
        setRemoveCart(updatedCart);
    }
    return removeItem;
    
   
}




