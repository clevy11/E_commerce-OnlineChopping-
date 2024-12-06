import React, {useEffect, useState} from 'react'
import Title from '../Title';
import { ProductConsumer} from '../../context';
import Line from "../Shared/Line";
import OrderColumns from "./OrderColumns";
import OrderList from "./OrderList";
import EmptyOrders from "./EmptyOrders";
import OrderTotals from "./OrderTotals";
import useAuth from "../../hooks/useAuth";
import { ButtonContainer } from '../Button';
import { approveOrder, rejectOrder } from '../../api';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import OrdersItemContainer from './OrderItemContainer';

const Orders = () => {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    const [fetched, setFetched] = useState(false);
    

    return (
        <section>
            <ProductConsumer>
                {value => {
                    const { userOrders, allOrders, fetchOrders, fetchProducts } = value;
                    const orders = auth?.profile?.role === 'ADMIN' ? allOrders : userOrders;
                    console.log("Orders items: ", orders);
                    if (!fetched) {
                        fetchOrders();
                        setFetched(true);
                    }
                    if (orders.length > 0) {
                        return (
                            <React.Fragment>
                                
                                <Title name="your" title="Orders" />
                        
                                {orders.map(item=>{
                                    return (<OrdersItemContainer item={item} value={value} />)
                                })}
                            
                            </React.Fragment>
                        );
                    } else {
                        return <EmptyOrders />;
                    }
                }}
            </ProductConsumer>
        </section>
    );
}

export  default Orders;
