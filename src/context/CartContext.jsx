import React from "react"
import { cartReducer } from "../reducers";

const cartInitialState =  {
    cartList : [],
    total : 0
}

export const CartContext  = React.createContext(cartInitialState);

export const CartProvider = (({children}) => {

    const [state,dispatch] = React.useReducer(cartReducer, cartInitialState);

    function addToCart(product){

        const updatedCartList = state.cartList.concat(product);
        const updatedTotal = state.total + product.price;

        dispatch({
            type : "ADD_TO_CART",
            payload : {
                 products : updatedCartList,
                 total : updatedTotal
            }
        })
    }
      
    function removeFromCart(product){
        const updatedCartList = state.cartList.filter(item => item.id !== product.id);
        const updatedTotal = state.total - product.price;

        dispatch({
            type : "REMOVE_FROM_CART",
            payload : {
                products : updatedCartList,
                total : updatedTotal
            }
        })
    }

    function clearCart(){
        dispatch({
            type : "CLEAR_CART",
            payload: {
                products : [],
                total : 0
            }
        })
    }
       




    const value = {
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        clearCart
       
    }


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
})