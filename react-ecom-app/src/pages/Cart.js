import { useContext, useState, useEffect } from "react";
import StarRating from "../components/StarRating"
import CartContext from "../context/CartContext";
import SavedPersonalDetailsContext from "../context/SavedPersonalDetailsContext";
import CartHistoryContext from "../context/CartHistoryContext";


function Cart () {

    const [ cart, setCart ] = useContext(CartContext);

    const [ showCheckout, setShowCheckout ] = useState(false);

    const [ orderComplete, setOrderComplete] = useState(false);

    const [ cartHistory, setCartHistory ] = useContext(CartHistoryContext);
    
    const { savedPersonalDetails, setSavedPersonalDetails } = useContext(SavedPersonalDetailsContext);

    const [ personalDetails, setPersonalDetails ] = useState({

        firstName: "",
        lastName: "",
        shippingAdress: "",
        email: "",
        phoneNumber: "",
        nameOnCard: "",
        cardNumber: "",
        cvc: "",
        expirationDate: ""
    })

    const totalPrice = cart.reduce((acc, cartItem)=> acc + cartItem.priceUSD, 0);

    const toggleForm = () => {
        setShowCheckout(!showCheckout);
    };


    const handleInputData = (e) => {
        const { name, value } = e.target;

        setPersonalDetails(prevPersonalDetails => ({
            ... prevPersonalDetails,
            [name]: value 
        }));
    }


//----------COMPLETE THE ORDER AND SAVE THE SUBMITTED INFORMATION.------------------------

    const OrderComplete = () => {

        setSavedPersonalDetails(prevPersonalDetails => [...prevPersonalDetails, personalDetails]);
        setOrderComplete(true);


        setCartHistory(
            { items: cart, prevPrice: totalPrice }
        );


        setPersonalDetails({
            firstName: "",
            lastName: "",
            shippingAdress: "",
            email: "",
            phoneNumber: "", 
            nameOnCard: "",
            cardNumber: "",
            cvc: "",
            expirationDate: ""
        });

    };
    
    const saveOrderInformation = () => {
        setCart([]);
        setShowCheckout(false);
        setOrderComplete(false);  
        console.log(cartHistory);
        test()   
    };

    const clearCart = () => {
        setCart([]);  
        setShowCheckout(false); 
        setOrderComplete(false); 
        
    };

    
   return ( 
    <div className="bg-gray-900 text-white">
        <div className="flex">
        {/*----RENDERING THE CART ON THE SITE AND ADDING QUANTITY SO THAT THE DIVS DONT GET STACKED-------------------------------------------*/}

            <div className="bg-gray-800 w-1/2 mt-12 gap-4 ml-12 p-4 flex flex-col">
                <h1 className=" text-white">Shopping cart:</h1>

                {Object.values(cart.reduce((acc, cartItem) => {
                    if (!acc[cartItem.id]) {
                        acc[cartItem.id] = {...cartItem, quantity: 1};
                    } else {
                        acc[cartItem.id].quantity += 1;
                    }
                    return acc;
                }, {}))
                .map((cartItem, index) => (
                    <div className="grid grid-cols-3 overflow-hidden rounded-xl h-[15rem] bg-gray-700">
                        <div className="w-2/3 ">
                            <img src={cartItem.imgUrl} className="h-full" />
                        </div>
                        <div className="flex flex-col justify-between -ml-16">
                            <h3 className="text-2xl mb-3 mt-2">{cartItem.name}</h3>                              
                            <div className="h-1/2"> 
                                {cartItem.quantity > 1 && <p className="text-xl">Quantity: {cartItem.quantity}</p>}
                                <div className="text-red-400 text-xl">Price: {cartItem.priceUSD}$ <StarRating rating={cartItem.rating}/></div>
                            </div>
                        </div>
                        <div className="flex items-center mb-4 justify-end mr-4">
                            <button className="hover:text-red-500 underline p-3 bg-black rounded-xl">Remove from cart!</button>
                        </div>
                    </div>
                ))}
            </div>

    {/*----SHOW **ContactForm** IF **showCheckout** IS true AND SHOW **BuyMessage** WHEN **orderComplete** IS true-------------------------------------------*/}

            <div className="flex flex-col ml-24 mt-24 h-[30rem] w-[40rem]">
                    {showCheckout === false ? (
                    <button onClick={toggleForm} className="text-2xl text-black font-semibold rounded-t-xl w-full p-4 bg-green-500">Show checkout Form</button>
                    ) : (
                        orderComplete ? (
                            <BuyMessage totalPrice={totalPrice} clearCart={clearCart} saveOrderInformation={saveOrderInformation} />
                        ) : (
                            <div>
                                <button onClick={toggleForm} className="text-2xl text-black font-semibold rounded-t-xl w-full p-4 bg-green-500">Hide checkout Form</button>
                                <ContactForm totalPrice={totalPrice} OrderComplete={OrderComplete} handleInputData={handleInputData}/>
                            </div>
                        )
                    )}
            </div>
        </div>
    {/*----ADDING **savedPersonalDetails** AND **cartHistory** BELOW-------------------------------------------*/}

        <div className="bg-red-500 p-8 mt-12 w-full">
            <PurchaseHistory totalPrice={cartHistory.prevPrice} />
        </div>
        
    </div>



   )

}


export default Cart;


function PurchaseHistory({}) {

    const { savedPersonalDetails, setSavedPersonalDetails } = useContext(SavedPersonalDetailsContext);
    const [ cartHistory, setCartHistory ] = useContext(CartHistoryContext);


    const [ showOrder, setShowOrder] = useState(true);


    return (
        <div className="flex">
            <div className="flex flex-col gap-4 w-2/5">
                <h1 className="text-black text-2xl font-bold">Purchase History:</h1>
                {savedPersonalDetails.map((data, index) => (
                    <div key={index} className="flex bg-blue-500 rounded-3xl p-4">
                        <div className="w-3/5">
                            <p><span className="text-2xl font-semibold text-black">User:</span> {data.firstName !== "" ? data.firstName + "_" + data.lastName : ""}</p>
                            <p><span className="text-black font-semibold">First Name:</span> {data.firstName}</p>
                            <p><span className="text-black font-semibold">Last Name:</span> {data.lastName}</p>
                            <p><span className="text-black font-semibold">Shipping Adress:</span> {data.shippingAdress}</p>
                            <p><span className="text-black font-semibold">Email:</span> {data.email}</p>
                            <p><span className="text-black font-semibold">Phone Number:</span> {data.phoneNumber}</p>
                        </div>
                        <div className="flex flex-col gap-2 w-2/5">
                            <p><span className="text-black font-semibold">Name on card:</span> {data.nameOnCard}</p>
                            <p><span className="text-black font-semibold">Card number:</span> {data.cardNumber}</p>
                            <p><span className="text-red-500 font-semibold">Cvc:</span> {data.cvc}</p>
                            <p><span className="text-black font-semibold">Expiration Date:</span> {data.expirationDate}</p>
                            <button className="p-2 mt-2 text-white bg-black rounded-xl">Show Order</button>
                        </div>
                    </div>
                ))}
            </div>
            {showOrder ? 
            <div className="bg-green-500 mt-12 rounded-3xl p-4 ml-24 w-[40rem]">
                 {cartHistory.items.map((item, index) => (
                    <div key={index}>
                        <p className="text-2xl">{item.name}</p>
                    </div>
                ))}
            </div>
            : null
        }
        </div>
    )

}




function ContactForm ({ totalPrice, OrderComplete, handleInputData }) {
  
    return (
        <div>  
            <div className="bg-gray-400 px-12 h-[32rem] rounded-b-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2  ">
                    <div className="flex flex-col ">
                        <h3 className="text-black text-3xl">Personal Details: </h3>
                        <Input className="text-black" text="First name:" type="text" name="firstName" placeholder="Joe" onChange={handleInputData}/>
                        <Input text="Last name:" type="text" name="lastName" placeholder="Rogan" onChange={handleInputData} />
                        <Input text="Shipping adress:" type="text" name="shippingAdress" placeholder="Calistreet 40" onChange={handleInputData}/>
                        <Input text="Email:" type="text" name="email" placeholder="example@gmail.com" onChange={handleInputData} />
                        <Input text="Phonenumber:" type="number" name="phoneNumber" placeholder="+46 89 962 42 67" onChange={handleInputData}/>
                    </div>
                    <div className="">
                    <h3 className="text-black text-3xl">Card Details:</h3>
                        <Input text="Name on card:"  type="text" name="nameOnCard" placeholder="Joe Rogan" onChange={handleInputData}/>
                        <Input text="Card number:"  type="number" name="cardNumber" placeholder="2012 5431 5679 3821" onChange={handleInputData} />
                        <Input text="cvc:"   type="number" name="cvc" placeholder="xxx" onChange={handleInputData} />
                        <Input text="Expiration date:"  type="number" name="expirationDate" placeholder="2020/12" onChange={handleInputData}/>
                        <div className="text-green-900 mt-4 text-2xl">
                            <p className="">Total order: {totalPrice}$</p>
                            <button onClick={OrderComplete} className="p-2 mt-4 bg-black text-white hover:text-red-500 rounded-xl" >Complete order!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

function BuyMessage({ totalPrice, clearCart, saveOrderInformation }) {
   
    return (
        <div className="flex flex-col gap-4 bg-gray-700 h-[32rem] items-center text-center rounded-3xl">
            <h2 className="text-6xl mt-12 font-semibold">Congratulations!</h2>
            <p className="text-4xl mt-4 font-semibold">Your purchase of <span className="text-red-600">{totalPrice}$</span> has been completed succesfully!</p>
            <button onClick={clearCart} className="p-4 mt-8 bg-black text-2xl w-1/3 rounded-full">Close</button>
            <button onClick={saveOrderInformation} className="p-4 mt-8 bg-black text-2xl w-1/3 rounded-full">Save History!</button>
        </div>
    )
}

function Input ({ placeholder, type, text, name, value, onChange }) {

    return (
        <div className="">
            <p className="mb-2 underline text-2xl font-semibold"> {text}</p>
            <input 
            className="rounded-md text-white p-2 bg-black"
            placeholder={placeholder} 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            />
        </div>
    )
}