import React, { Component, useEffect, useState } from 'react';
import Product from "./Product";
import Title from "./Title";
import useAppState from '../hooks/useAppState';
import { getProducts } from '../api';
import Alert from './Shared/Alert';


const ProductList = () => {
    const { alert, showAlert, handleCloseAlert, handleShowAlert, setProducts: setGrobalProducts } = useAppState(); 
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        getProducts((err, data) => {
            if (err) {
                // Handle error
            } else {
                let tempProducts = data?.data?.map(item => ({ ...item }));
                setProducts(tempProducts);
                setGrobalProducts(tempProducts);
            }
        });
    };

    const onActionComplete = () => {
        fetchProducts();
    }
    
    return (
        <React.Fragment>
            <div className="py-5">
                <div className="container">
                    <Title name="our" title="products" />
                    {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
                    <div className="row">
                        {products.map(product => (
                            <Product key={product.id} product={product} handleShowAlert={handleShowAlert} onActionComplete={onActionComplete} />
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductList;
