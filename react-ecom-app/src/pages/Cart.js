import { useContext } from "react";
import CartContext from "../context/CartContext";
import StarRating from "../components/StarRating";
import RemoveFromCart from "../components/RemoveFromCart";
import { useParams } from "react-router-dom";


function Cart () {

    const [cart, setCart] = useContext(CartContext);
    const { id } = useParams();
    const handleRemoveFromCart = (id) => {
        RemoveFromCart(id);
    }

    return (
        <div className="pt-12 text-white mx-24">{cart.length === 0 ?
            <h1 className="text-5xl font-semibold mb-12 ml-4">Shoppingcart is empty.<br/><br/>Please add an item!</h1>
            :
            <div className="pt-12 text-white mx-24"> 
                <h1 className="text-5xl font-semibold mb-12 ml-4">Shoppingcart:</h1>
                <div className="flex flex-col gap-4 w-2/3 ">
                    {cart.map((cartItem, index) => (
                        <div className="flex gap-8 p-4 bg-gray-800">
                            <img src={cartItem.imgUrl} className="w-[10rem] h-[10rem] object-cover" />
                            <div className="relative">
                                <h3 className="text-2xl mb-3 mt-2">{cartItem.name}</h3>
                                <p className="text-red-400">Price: {cartItem.priceUSD}$ <StarRating rating={cartItem.rating}/></p>
                                <button onClick={() => handleRemoveFromCart(cartItem.id)} className="hover:text-red-500 underline absolute bottom-0 p-3 bg-black rounded-xl">Remove from cart!</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        }</div>
    )
}

export default Cart;