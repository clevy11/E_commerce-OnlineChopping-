import React from 'react';
import CartItem from './CartItem';
import useAppState from '../../hooks/useAppState';

export default function CartList() {
    const value = useAppState();
    const { cart } =value;
   
    return (
     <div className="container-fluid">
         {cart.map(item=>{
             return <CartItem key={item.id} item={item} value={value}/>
         })} 
        
    </div>
    );
}
