import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";


function AllProducts () {

    const [products, setProducts] = useState([]);

    useEffect(() =>{

        async function fetchProducts () {

            await fetch("https://play-ecom-api.allcodeapp.com/api/products")
                .then(async (data) =>{
                    const response = await data.json();
                    setProducts(response);
                })
        }
        fetchProducts();
    }, []);

    return (
        <div className="p-12 w-screen mt-auto bg-gray-900">
            <h1 className="text-6xl mb-5 text-white font-semibold">Products</h1>
            <div className="flex flex-col md:grid md:grid-cols-5 gap-12">
                {products && products.map((product, index) => (
                    <Product product={product} key={index} />
                ))}
            </div>
        </div>
    )
}

function Product ({ product }) {
    return (
        <div className="flex flex-col h-[25rem] border-[4px] overflow-hidden items-center justify-between bg-gray-400 gap-4 rounded-3xl">
            <img src={product.imgUrl} className=" w-full h-[12rem] object-cover" />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <div className="flex gap-2 flex-row items-center">
                <p className="">{product.priceUSD}$</p>
                <p className="text-2xl">|</p>
                <StarRating rating={product.rating} />
            </div>
            <Link to={"/product/" + product.id} className="text-center hover:bg-blue-400 hover:text-white w-full p-2 rounded-full mx bg-blue-500">View!</Link>
        </div>
    )
}




export default AllProducts;