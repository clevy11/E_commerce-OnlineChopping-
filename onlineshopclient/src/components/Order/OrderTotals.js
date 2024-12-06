import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth';

export default function     OrderTotals({value}) {
    const { auth } = useAuth();
    const {cartSubTotal, cartTax, cartTotal,clearCart, createOrder, order} = value;
    const axios = useAxiosPrivate();
    const navigate = useNavigate();


    return <React.Fragment>
       <div className="px-5">
           <div className="pr-5 row d-flex justify-content-end">
               <div className="text-capitalize text-right">
                    <h5>
                        <span className="text-title">subtotal :</span>
                        <strong>{cartSubTotal}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">tax :</span>
                        <strong>{cartTax}</strong>
                    </h5>
                    <h5>
                        <span className="text-title">total :</span>
                        <strong>{cartTotal}</strong>
                    </h5>
                   <button
                       className="btn btn-outline-info text-uppercase mb-3 px-5"
                       type="button"
                       onClick={() => {
                           createOrder(axios, order, auth?.profile, (err, data) => {
                               if (!err) {
                                   navigate("/user/orders", { replace: true });
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
