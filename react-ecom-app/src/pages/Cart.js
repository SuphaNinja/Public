import { useState, useContext, useEffect } from "react";
import CartContext from "../context/CartContext";
import StarRating from "../components/StarRating";
import RemoveFromCart from "../components/RemoveFromCart";
import { useParams } from "react-router-dom";
import { PurchaseHistoryContext } from "../context/PurchaseHistoryContext";

function Cart () {

    
    const [cart, setCart] = useContext(CartContext);
//----------------------------------------------------------------------------------------
    const [historyData, setHistoryData] = useState([]);
    const [history, setHistory] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [purchaseComplete, setPurchaseComplete] = useState(false);
//----------------------------------------------------------------------------------------


    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [purchase, setPurchase] = useContext(PurchaseHistoryContext);

    const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);

//----------------------------------------------------------------------------------------


    const totalPrice = cart.reduce((acc, cartItem)=> acc + cartItem.priceUSD, 0);
    const totalPurchasePrice = purchaseHistory.reduce((total, purchase) => total + purchase.totalPrice, 0);


 //----------------------------------------------------------------------------------------
    const togglePurchaseHistory = () => {
        setShowPurchaseHistory(!showPurchaseHistory);
    }


//----------------------------------------------------------------------------------------
    const [detailsData, setDetailsData] = useState({
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


//----------------------------------------------------------------------------------------
    

        const handleChange = (e) => {
            const { name, value } = e.target;
            
            setDetailsData(prevData => ({
                ...prevData,
                [name]: value
            }))
        }

//----------------------------------------------------------------------------------------
console.log(purchaseHistory);

    const handleSubmit = () => {
        setHistoryData(prevData => [...prevData, detailsData]);
        
        setDetailsData({
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

        setHistory(true);
        setPurchaseComplete(false);
        setShowForm(true)
        
        setPurchaseHistory(prevCart => [
            ...prevCart,
            { items: cart, totalPrice: totalPrice }
        ]);

        setCart([]);
    }
//----------------------------------------------------------------------------------------


    const toggleForm = () => {
        setShowForm(!showForm);
    };
//----------------------------------------------------------------------------------------------



    let currentPrice = totalPrice;
    const togglePurchaseComplete = () => {
        setPurchaseComplete(true);
        setShowForm(false);
        currentPrice = totalPrice
    }
//----------------------------------------------------------------------------------------
                {/* ---------------------------------SHOPPING CART--------------------------------*/}
    return (
        <div className="pt-12 text-white mx-24"> 
            {cart.length === 0 && purchaseHistory.length === 0 ?
            <h1 className="text-5xl font-semibold mb-12 ml-4">Shoppingcart is empty.<br/><br/>Please add an item!</h1>
            :
            <div className="grid grid-cols-2 text-white gap-12 "> 
                <div className="flex flex-col gap-4  ">
                <h1 className="text-5xl font-semibold mb-12 ml-4">Shoppingcart:</h1>
                
                {Object.values(cart.reduce((acc, cartItem) => {
                    if (!acc[cartItem.name]) {
                        acc[cartItem.name] = {...cartItem, quantity: 1};
                    } else {
                        acc[cartItem.name].quantity += 1;
                    }
                    return acc;
                }, {})).map((cartItem, index) => (
                        <div className="grid grid-cols-3 h-42 bg-gray-800">
                            <div className="w-2/3 h-full">
                                <img src={cartItem.imgUrl} className="h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-between -ml-16">
                                <h3 className="text-2xl mb-3 mt-2">{cartItem.name}</h3>                              
                                <div>
                                    {cartItem.quantity > 1 && <p className="text-xl">Quantity: {cartItem.quantity}</p>}
                                    <div className="text-red-400 text-xl">Price: {cartItem.priceUSD}$ <StarRating rating={cartItem.rating}/></div>
                                </div>
                            </div>
                            <div className="flex items-end mb-4 justify-end mr-4">
                                <button className="hover:text-red-500 underline p-3 bg-black rounded-xl">Remove from cart!</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col mt-28">
                    {showForm ? (
                        <button onClick={toggleForm} className="text-2xl text-black font-semibold rounded-t-xl p-4 bg-green-500">Show checkout form!</button>
                    ) : (
                        purchaseComplete ? (
                            <BuyMessage totalPrice={totalPrice} />
                        ) : (
                            <ContactForm totalPrice={totalPrice} togglePurchaseComplete={togglePurchaseComplete} />
                        )
                    )}
                </div>




                {/* ---------------------------------PURCHASE HISTORY--------------------------------*/}



                <div className="flex rounded-xl bg-gray-500  text-white p-12">
                    <div>
                        <h2 className="text-4xl mb-4 text-black">Purchase history:</h2>
                        <div className="flex flex-col text-xl w-full gap-4">
                            {historyData.map((data, index) => (
                                <div className="flex text-white overflow-hidden h-[23rem] rounded-3xl w-full" key={index}>
                                    <div className="bg-gray-400 w-1/2">
                                        <div className=" flex flex-col gap-5 mt-4 ml-4">
                                            <p><span className="text-2xl font-semibold text-black">User:</span> {data.firstName !== "" ? data.firstName + "_" + data.lastName : ""}</p>
                                            <p><span className="text-black font-semibold">First Name:</span> {data.firstName}</p>
                                            <p><span className="text-black font-semibold">Last Name:</span> {data.lastName}</p>
                                            <p><span className="text-black font-semibold">Shipping Adress:</span> {data.shippingAdress}</p>
                                            <p><span className="text-black font-semibold">Email:</span> {data.email}</p>
                                            <p><span className="text-black font-semibold">Phone Number:</span> {data.phoneNumber}</p>
                                            <div className="flex items-center">
                                                <p className="text-xl mr-4 text-green-800">Total price: {totalPurchasePrice}$</p>
                                                <button onClick={togglePurchaseHistory} className="bg-black p-2 rounded-xl hover:text-red-500">Check order</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col bg-gray-600 w-1/2 text-white ">
                                        <div className="flex flex-col text-xl gap-2 mb-2 ml-2">
                                            <p><span className="text-black font-semibold">Name on card:</span> {data.nameOnCard}</p>
                                            <p><span className="text-black font-semibold">Card number:</span> {data.cardNumber}</p>
                                            <p><span className="text-red-500 font-semibold">Cvc:</span> {data.cvc}</p>
                                            <p><span className="text-black font-semibold">Expiration Date:</span> {data.expirationDate}</p>
                                        </div>
                                        <div className="">
                                            <img className="h-[15rem] w-full object-cover" src="https://zenquotes.io/api/image"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* ---------------------------------TOGGLE SHOPPING HISTORY ARRAY TO SHOW ON THE RIGHT--------------------------------*/}
                <div>
                    {showPurchaseHistory && <ShowPurchaseHistory />}
                </div>
                
            </div>
        }</div>
    )
    



function ContactForm () {
    

        return (
            <div>
                <button onClick={toggleForm} className="text-2xl w-full text-black font-semibold rounded-t-xl p-4 bg-red-500">Show checkout form!</button>
                <div className="bg-gray-400 px-12 h-[32rem] rounded-b-xl">
                      <div className="grid grid-cols-1 md:grid-cols-2  ">
                        <div className="flex flex-col ">
                            <h3 className="text-black text-3xl">Personal Details: </h3>
                            <input className="text-black" text="First name:" value={detailsData.firstName} onChange={handleChange} type="text" name="firstName" placeholder="Joe" />
                            <Input text="Last name:"  value={detailsData.lastName} type="text" name="lastName" placeholder="Rogan" />
                            <Input text="Shipping adress:"  value={detailsData.shippingAdress} type="text" name="shippingAdress" placeholder="Calistreet 40" />
                            <Input text="Email:" value={detailsData.email} type="text" name="email" placeholder="example@gmail.com"  />
                            <Input text="Phonenumber:" value={detailsData.phoneNumber} type="number" name="phoneNumber" placeholder="+46 89 962 42 67" />
                        </div>
                        <div className="">
                        <h3 className="text-black text-3xl">Card Details:</h3>
                            <Input text="Name on card:" value={detailsData.nameOnCard} type="text" name="nameOnCard" placeholder="Joe Rogan"  />
                            <Input text="Card number:"  value={detailsData.cardNumber} type="number" name="cardNumber" placeholder="2012 5431 5679 3821"  />
                            <Input text="cvc:"  value={detailsData.cvc} type="number" name="cvc" placeholder="xxx" />
                            <Input text="Expiration date:"  value={detailsData.expirationDate} type="number" name="expirationDate" placeholder="2020/12" />
                            <div className="text-green-900 mt-4 text-2xl">
                                <p className="">Total order: {totalPrice}$</p>
                                <button className="p-2 mt-4 bg-black text-white hover:text-red-500 rounded-xl" onClick={togglePurchaseComplete}>Complete order!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}



function Input ({ placeholder, type, text, name, value, }) {

    return (
        <div className="">
            <p className="mb-2 underline text-2xl font-semibold"> {text}</p>
            <input 
            className="rounded-md text-white p-2 bg-black"
            placeholder={placeholder} 
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            />
        </div>
    )
}

function BuyMessage() {
    const handleClose = () => {
        setPurchaseComplete(false);
        setShowForm(true);
        setCart([]);

    }
    return (
        <div className="flex flex-col gap-4 bg-gray-700  h-[32rem] items-center text-center rounded-3xl">
            <h2 className="text-6xl mt-28 font-semibold">Congratulations!</h2>
            <p className="text-4xl mt-4 font-semibold">Your purchase of <span className="text-red-600">{currentPrice}$</span> has been completed succesfully!</p>
            <button onClick={handleClose} className="p-4 mt-8 bg-black text-2xl w-1/3 rounded-full">Close</button>
            <button onClick={handleSubmit} className="p-4 mt-8 bg-black text-2xl w-1/3 rounded-full">Save History!</button>
        </div>
    )
}

function ShowPurchaseHistory () {

    return (
        <div className="bg-gray-900 rounded-xl "> 
            {purchaseHistory.map((purchase, index) => (
            <div className="p-4" key={index}>
                <div className="bg-black p-2 rounded-xl flex justify-between mr-60">
                    <h3 className="text-2xl font-semibold">Purchase: <span className="text-2xl font-semibold">{index + 1}</span></h3>
                    <p className="text-2xl font-semibold">Total Price: <span className="text-2xl mr-8 font-semibold">{purchase.totalPrice}$</span></p>
                </div>
                {Object.values(
                        purchase.items.reduce((acc, item) => {
                            if (!acc[item.name]) {
                                acc[item.name] = {
                                    ...item,
                                    quantity: 1
                                };
                            } else {
                                acc[item.name].quantity += 1;
                            }
                            return acc;
                        }, {})
                    ).map((groupedItem, itemIndex) => (
                        <div className="" key={itemIndex}>
                            <p>Name: <span>{groupedItem.name}</span></p>
                            <p>Price: <span>{groupedItem.priceUSD}$</span></p>
                            <p>Quantity: <span>{groupedItem.quantity}</span></p>
                        </div>
                    ))}
            </div>
            ))}
        </div>
    );
}

}


export default Cart;