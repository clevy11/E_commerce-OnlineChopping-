import React from 'react'

export default function OrderItem ({item,value, context}) {
    const  { product, id, unitePrice, quantity} = item;
    const { price, image, name} = product;
    const {increment,decrement,removeItem} = context;
    return (
        <div className="row my-2 text-capitalize text-center">
           <div className="col-10 mx-auto col-lg-2">
              <img src={image} style={{width:"5rem" , height:"5rem"}}className="img-fluid" alt="product"/>
           </div>
           <div className="col-10 mx-auto col-lg-2">
               <span className="d-lg-none">product : </span>{name}
           </div>
           <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>{price}
           </div>
           <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
             <div className="d-flex justify-content-center">
                 <div>
                    <span className="btn btn-black mx-1">{quantity}</span>
                 </div>
             </div>
           </div>
            {/**/}
            <div className="col-10 mx-auto col-lg-2">
                <strong>item total : $ {price}</strong>
            </div>
        </div>
    )
}
