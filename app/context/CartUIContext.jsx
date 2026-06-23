import { createContext, useContext, useState, useEffect } from "react";

const CartUIContext = createContext(null);

export function CartUIProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync from localStorage on client mount
  useEffect(() => {
    setIsCartOpen(localStorage.getItem("cartOpen") === "true");
  }, []);

  const openCart = () => {
    setIsCartOpen(true);
    localStorage.setItem("cartOpen", "true");
  };

  const closeCart = () => {
    setIsCartOpen(false);
    localStorage.setItem("cartOpen", "false");
  };

  const toggleCart = () => {
    isCartOpen ? closeCart() : openCart();
  };

  return (
    <CartUIContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  const ctx = useContext(CartUIContext);
  if (!ctx) throw new Error("useCartUI must be used inside CartUIProvider");
  return ctx;
}