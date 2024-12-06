import React from 'react';
import OrderItem from "./OrderItem";

export default function OrderList({value, context}) {
    const { orderProducts } = value;

    return (
     <div className="container-fluid">
         {orderProducts.map(item=> {
            console.log("Product item: ", item)
             return <OrderItem key={item.id} item={item} value={value} context={value} />
         })}

    </div>
    );
}
