import React from 'react'
import { useState, useEffect, useContext } from 'react'

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )

}





const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
