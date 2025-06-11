

import React from 'react'
import { CartEmpty } from './components/CartEmpty';
import { CartList } from './components/CartList';
import { CartContext } from '../../context/CartContext';
import { useTitle } from '../../hooks/useTitle';

export const CartPage = () => {
   
  const { cartList,total } = React.useContext(CartContext);
  useTitle({title: `Cart (${cartList.length})`})
   
  return (
    <main>
       {
        cartList.length > 0 ? <CartList products={cartList} total={total}/> : <CartEmpty /> 
        }
    </main>
  )
}


