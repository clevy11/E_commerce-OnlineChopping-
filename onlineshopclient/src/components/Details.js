import React, { Component, useEffect, useState } from 'react'
import { ProductConsumer } from '../context';
import { Link, useParams } from 'react-router-dom';
import { ButtonContainer } from './Button';
import useAuth from "../hooks/useAuth";
import { getProduct } from '../api/_product';
import useAppState from '../hooks/useAppState';

const Details = () => {

    const { auth } = useAuth();
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const { id, image, description, price, name, inCart } = product;
    const { addToCart, openModal } = useAppState();
    useEffect(() => {
        fetchProduct(productId);
    }, []);

    const fetchProduct = (id) => {
        getProduct(id, (err, data) => {
            if (err) {
                // Handle error
            } else {
                console.log("DATA FE : ", data?.data);
                setProduct(data?.data);
            }
        });
    };
    return (
        <div className="container py-5">
            {/*title*/}
            <div className="row>">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>{name}</h1>
                </div>
            </div>
            {/*end of title*/}
            {/*product info*/}
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <img src={image} className="img-fluid" alt="product" />
                </div>
                {/*product text*/}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h2>model:{name}</h2>
                    <h4 className="text-blue">
                        <strong>
                            Price : <span>$</span>{price}
                        </strong>
                    </h4>
                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                        some info about product
                    </p>
                    <p className="text-muted lead">
                        {description}
                    </p>
                    {/*buttons*/}
                    <div>
                        <Link to="/">
                            <ButtonContainer>
                                back to products
                            </ButtonContainer>
                        </Link>
                        {auth?.profile?.role === 'USER' && (
                            <ButtonContainer cart disabled={inCart ? true : false}
                                onClick={() => {
                                    addToCart(auth?.profile, id);
                                    openModal(id);
                                }}>
                                {inCart ? "inCart" : "add to cart"}
                            </ButtonContainer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
