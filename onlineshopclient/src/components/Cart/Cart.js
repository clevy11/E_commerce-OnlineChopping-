import React, { Component } from 'react'
import Title from '../Title';
import CartColumns from './CartColumns';
import useAppState from '../../hooks/useAppState';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from "./CartTotals";
import Line from "../Shared/Line";


const Cart = () => {
    const value = useAppState();
    const { cart, alert, showAlert, handleCloseAlert, handleShowAlert, setProducts: setGrobalProducts } = value;

    if (cart.length > 0) {
        return (
            <React.Fragment>
                <div className='mt-5'><Title name="your" title="cart" /></div>
                <div className="card pt-5 px-3 m-5">
                    <CartColumns />
                    <CartList value={value} />
                    <CartTotals />
                </div>
            </React.Fragment>
        );
    } else {
        return <EmptyCart />;
    }
}
export default Cart;

