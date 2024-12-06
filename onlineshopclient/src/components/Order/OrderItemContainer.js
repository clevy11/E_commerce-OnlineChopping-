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
import { cancelOrder, unCancelOrder } from '../../api/_order';

const OrdersItemContainer = ({ item, value }) => {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    const [currentItem, setCurrentItem] = useState(item);
    const [fetched, setFetched] = useState(false);
    

    return (
        <>
        <div className='card pt-5 px-3 m-5 d-flex flex-row row'>
            <div className="col-10">
                <OrderColumns />
                <OrderList value={currentItem} context={value} />
                {/* <OrderTotals value={value} history={this.props.history} /> */}
            </div>
            <div className='col-2'>
                <div className="">
                    <div className='d-flex justify-content-center align-items-center'>
                    <p className="text-uppercase">Order status & Actions</p>
                    </div>
                    <Line label={"status"} />
                    <div className='d-flex justify-content-center align-items-center'>
                    <ButtonContainer success={currentItem?.status === "APPROVED"} danger={currentItem?.status === "REJECTED"}>
                        {currentItem?.status}
                       </ButtonContainer>
                    </div>
                       {(currentItem?.status === "PENDING" || currentItem?.status === "CANCELED") && <Line label={"actions"} />}
                       <div className='d-flex justify-content-center align-items-center'>
                       {(currentItem?.status === "PENDING" && auth?.profile?.role === 'ADMIN') && (
                       <ButtonContainer danger onClick={() => {
                          rejectOrder(axios, currentItem?.id, (err, data) => {
                            if (err) {
                                // Handle error
                            } else {
                                setCurrentItem(data?.data);
                            }
                        });
                       }}>
                          Reject
                       </ButtonContainer>)}
                       
                       {(currentItem?.status === "PENDING" && auth?.profile?.role === 'ADMIN') && (
                          <ButtonContainer success onClick={() => {
                            approveOrder(axios, currentItem?.id, (err, data) => {
                              if (err) {
                                  // Handle error
                              } else {
                                  setCurrentItem(data?.data);
                              }
                            });
                           }}>
                             Accept
                          </ButtonContainer>
                       )}
                       {(currentItem?.status === "PENDING" && auth?.profile?.role === 'USER') && (
                       <ButtonContainer danger onClick={() => {
                        cancelOrder(axios, currentItem?.id, (err, data) => {
                            if (err) {
                                // Handle error
                            } else {
                                setCurrentItem(data?.data);
                            }
                        });
                       }}>
                          Cancel Order
                       </ButtonContainer>)}
                       {(currentItem?.status === "CANCELED" && auth?.profile?.role === 'USER') && (
                       <ButtonContainer onClick={() => {
                        unCancelOrder(axios, currentItem?.id, (err, data) => {
                            if (err) {
                                // Handle error
                            } else {
                                setCurrentItem(data?.data);
                            }
                        });
                       }}>
                          Uncancel Order
                       </ButtonContainer>)}
                       </div>
                </div>
            </div>
        </div>
    </>
    );
}

export  default OrdersItemContainer;
