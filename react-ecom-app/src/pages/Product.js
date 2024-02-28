import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";

import CartContext from "../context/CartContext";


function Product () {

    const { id } = useParams();
    const [product, setProduct] = useState({});

    const [cart, setCart] = useContext(CartContext);

    const addToCart = () => {

        setCart([...cart, product])
    }

    useEffect(() => {
        async function fetchProduct () {
    
            await fetch("https://play-ecom-api.allcodeapp.com/api/products/" + id)
                .then(async (data) => {
                    const response = await data.json();
                    setProduct(response);
                });

        }
        fetchProduct();
    }, []);


    return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-800 mt-16 p-16 w-screen">
        <div className="">
            <img src={product.imgUrl} className=" ml-16 p-4 rounded-3xl w-[40rem] h-[40rem] object-cover"/>
        </div>
        <div className="flex flex-col justify-between rounded-xl h-[38rem] w-[23rem] bg-gray-900 p-4 text-white ">
            <h3 className="text-2xl font-semibold">{product.name}</h3>
            <p className="text-xl">{product.description}</p>
            <div>
                <p className="text-2xl">Price: {product.priceUSD}$</p>
                <StarRating className="text-2xl" rating={product.rating} />
            </div>
            <button onClick={addToCart} 
                className="bg-gray-500 p-4 text-center text-black text-xl font-semibold rounded-xl w-1/2 transition duration-3 00 ease-in-out hover:ease-in-out hover:bg-gray-200 hover:text-red-600 " >
                Add to cart!
            </button>
        </div>
    </div>
    )
}

export default Product;