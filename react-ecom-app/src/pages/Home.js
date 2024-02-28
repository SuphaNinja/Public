import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllProducts from "../components/AllProducts";
import BreakPoint from "../components/Breakpoint";

function Home () {

    const [featured, setFeatured] = useState({});

    useEffect(() => {

        async function fetchFeaturedProduct () {
            await fetch("https://play-ecom-api.allcodeapp.com/api/featured")
                .then(async (data) =>{
                    const response = await data.json();
                    setFeatured(response);   
                })
        }
        fetchFeaturedProduct();
    }, []);

    return(
        <main className="w-screen">
            <header className="h-[30rem] w-screen relative">
                <img src={featured.bannerUrl} className="h-[30rem] w-full object-cover md:object-fill" />
                <div className="flex justify-center text-center items-center absolute h-[30rem] w-screen bg-gray-800/70 text-white bottom-0">
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl">{featured.promoTitle}</h1>
                        <Link to={"/product/" + featured.id} className="bg-blue-600 p-2 text-xl rounded-xl w-1/5 mt-8 bottom-0 text-center transition duration-150 ease-out hover:ease-in-out hover:text-black">
                            View Featured!
                        </Link>
                    </div>
                </div>
            </header>
            <BreakPoint/>
            <AllProducts/>
        </main>
    );
}

export default Home;