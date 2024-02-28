import { useContext, useState } from "react"
import CartContext from "../context/CartContext"
import { useParams } from "react-router-dom";


function RemoveFromCart () {

    const { id } = useParams();
    

    
    const [removeCart, setRemoveCart] = useContext(CartContext);

    const removeItem = (idToRemove) => {

        const updatedCart = removeCart.filter((item) => item.id !== id);
        setRemoveCart(updatedCart);
    }
    return removeItem;
    
   
}

export default RemoveFromCart;


