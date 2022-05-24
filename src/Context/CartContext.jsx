import React, { createContext, useState } from "react";

const CartContext = createContext()

export const CartContextProvider = (props) => {
    const [cart,setCart] = useState([])
    return (
        <CartContext.Provider value={{cart,setCart}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext