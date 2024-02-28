// PurchaseHistoryContext.js
import React, { createContext, useState, useEffect } from "react";

const PurchaseHistoryContext = createContext();

const PurchaseHistoryProvider = ({ children }) => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    // Load purchase history from localStorage when component mounts
    const storedPurchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory"));
    if (storedPurchaseHistory) {
      setPurchaseHistory(storedPurchaseHistory);
    }
  }, []);

  useEffect(() => {
    // Save purchase history to localStorage whenever it changes
    localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
  }, [purchaseHistory]);

  return (
    <PurchaseHistoryContext.Provider value={{ purchaseHistory, setPurchaseHistory }}>
      {children}
    </PurchaseHistoryContext.Provider>
  );
};

export { PurchaseHistoryContext, PurchaseHistoryProvider };
