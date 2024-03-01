import { Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Browse from "./pages/Browse";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ProductsPage from "./pages/ProductsPage";

import CartContext from "./context/CartContext";
import SavedPersonalDetailsContext from "./context/SavedPersonalDetailsContext";
import CartHistoryContext from "./context/CartHistoryContext";
import { useState } from "react";

function App() {
  const [ cartHistory, setCartHistory ] = useState([]);
  const [ cart, setCart ] = useState([]);
  const [ savedPersonalDetails, setSavedPersonalDetails ] = useState([]);

  return (
    <div className="bg-black h-[5000px]">
      <CartContext.Provider value={[cart, setCart]}>
        <CartHistoryContext.Provider value={[cartHistory, setCartHistory]}>
        <SavedPersonalDetailsContext.Provider value={{ savedPersonalDetails, setSavedPersonalDetails }}>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />}/>
              <Route path="/products" element={<ProductsPage />}/>
              <Route path="/product/:id" element={<Product />} />
              <Route path="/contact" element={<Contact />}/>
              <Route path="/cart" element={<Cart />}/>
            </Routes>
          </SavedPersonalDetailsContext.Provider>
          </CartHistoryContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
