import { Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Browse from "./pages/Browse";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ProductsPage from "./pages/ProductsPage";

import CartContext from "./context/CartContext";
import { useState } from "react";
import { PurchaseHistoryContext } from "./context/PurchaseHistoryContext";
function App() {

  const [cart, setCart] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  return (
    <div className="bg-black h-[5000px]">
      <PurchaseHistoryContext.Provider value={[purchaseHistory, setPurchaseHistory]}>
      <CartContext.Provider value={[cart, setCart]}>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />}/>
            <Route path="/products" element={<ProductsPage />}/>
            <Route path="/product/:id" element={<Product />} />
            <Route path="/contact" element={<Contact />}/>
            <Route path="/cart" element={<Cart />}/>
          </Routes>
      </CartContext.Provider>
      </PurchaseHistoryContext.Provider>
    </div>
  );
}

export default App;
