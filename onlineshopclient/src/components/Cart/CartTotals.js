import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAppState from '../../hooks/useAppState';
import useAuth from '../../hooks/useAuth';


export default function CartTotals() {
    const value = useAppState();
    const { auth } = useAuth();
    const { cart, clearCart, createOrder, order, getTotals } = value;
    const { subTotal, tax, total } = getTotals(cart);
    const axios = useAxiosPrivate();
    const navigate = useNavigate();


    return <React.Fragment>
       <div className="px-5">
           <div className="pr-5 row d-flex justify-content-end">
               <div className="text-capitalize text-right">
                    <h5>
                        <span className="text-title">subtotal :</span>
                        <strong>{subTotal}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">tax :</span>
                        <strong>{tax}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">total :</span>
                        <strong>{total}</strong>
                    </h5>
                   <button
                       className="btn btn-outline-info text-uppercase mb-3 px-5"
                       type="button"
                       onClick={() => {
                           createOrder(axios, order, auth?.profile, cart, total, (err, data) => {
                               if (!err) {
                                   navigate("/user/orders");
                               }
                           });
                       }}>
                       Check out
                   </button>
               </div>
           </div>
       </div>

       </React.Fragment>;

}
