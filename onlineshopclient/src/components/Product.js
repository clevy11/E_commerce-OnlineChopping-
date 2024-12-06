import React, { Component } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";
import { deleteProducts } from '../api/_product';


const Product = ({ product, handleShowAlert, onActionComplete }) => {
    const { auth } = useAuth();
    const { id, name, image, price, inCart } = product;

    const deleteProduct = () => {
        deleteProducts(product, (err, data) => {
              try {
                if (err) {
                    handleShowAlert({ type: 'err', message: "Something went wrong. Could not delete product!!" });
                } else {
                    handleShowAlert({ type: 'info', message: "Product deleted successfully!!" });
                    onActionComplete();
                }
              } catch (error) {}
            });
      };

    return (
        <ProducrWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
            <div className="card">
                <ProductConsumer>
                    {value => (
                        <div className="img-container p-5" onClick={() => value.handleDetail(id)}>
                            <Link to={`/product/details/${id}`}>
                                <img src={image} alt="product" className="card-img-top" />
                            </Link>
                            <button className='cart-btn' >
                                {auth?.profile?.role === 'ADMIN' && (<div>
                                    <Link to={`/product/edit/${id}`}><button className=''><i className="fas fa-edit"></i></button></Link>
                                   <button onClick={deleteProduct} className=''><i className="fas fa-trash"></i></button>
                                </div>)}
                                
                                {(!auth || !auth?.profile || auth?.profile?.role === 'USER') && (<button className='cart-btn' disabled={inCart} onClick={() => {
                                    value.addToCart(auth?.profile, id);
                                    value.openModal(id);
                                }}>
                                    {inCart ? (
                                    <p className="text-capitalize mb-0" disabled>
                                        {" "}
                                        in Cart
                                    </p>
                                ) : (
                                    <i className="fas fa-cart-plus" />
                                )}
                                </button>)}
                            </button>
                        </div>
                    )}
                </ProductConsumer>
                <div className="card-footer d-flex justify-content-between">
                    <p className="align-self-center mb-0">{name}</p>
                    <h5 className="text-blue font-italic mb-0">
                        <span className="mr-1">$</span>
                        {price}
                    </h5>
                </div>
            </div>
        </ProducrWrapper>
    );
};

export default Product;

Product.propTypes = {
    product:PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        title:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    }).isRequired
}
const ProducrWrapper =styled.div`
.card{
    border-color:tranparent;
    transition:all 1s linear;
}
.card-footer{
    background:transparent;
    border-top:transparent;
    transition:all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background:rgba(247,247,247);
    }
}
.img-container{
    position:relative;
    overflow:hidden;
}
.card-img-top{
     transition:all 1s linear;
}
.img-container:hover .card-img-top{
    transform:scale(1.2);
}
.cart-btn{
    position:absolute;
    bottom:0;
    right:0;
    padding:0.2rem 0.4rem;
    background:var(--lightBlue);
    color:var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5 rem 0 0 0;
    transform:translate(100%, 100%);
    transition:all 1s linear;
}
.img-container:hover .cart-btn{
    transform:translate(0, 0);
}
.cart-btn:hover{
    color:var(--mainBlue);
    cursor:pointer;
}
`;
