import React, {createContext, seState, useContext, useEffect, useState} from "react";
import {detailProduct} from "./data";
import {approveOrder, getAllOrders, getProducts, getUserOrders} from "./api";
import {Order, OrderProduct} from "./models";
import {checkout} from "./api/_cart";
import AuthContext from "./context/AuthProvider";
import useAuth from "./hooks/useAuth";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

const ProductContext = createContext({});
const ProductProvider = ({ children }) => {
    const defaulAlert = { type: 'err', message: "Something went wrong!" };
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    const [products, setProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState({});
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState(detailProduct);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [cartTax, setCartTax] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [order, setOrder] = useState(new Order());
    const [orderProducts, setOrderProducts] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [allOrders, setAllUserOrders] = useState([]);
    const [alert, setAlert] = useState(defaulAlert);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);


    const handleShowAlert = data => {
        console.log("ALERT DATA: ", data)
        setAlert(data || defaulAlert);
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setAlert(null);
        setShowAlert(false);
    };

    const fetchOrders = () => {
        if (auth?.profile?.role === 'ADMIN') {
            getAllOrders(axios, (err, data) => {
                if (err) {
                    // Handle error
                } else {
                    setAllUserOrders(data?.data);
                    console.log("Orders: ", data?.data);
                }
            });
        } else {
            getUserOrders(axios,auth?.profile?.id, (err, data) => {
                if (err) {
                    // Handle error
                } else {
                    let tempOrders = data?.data?.map(item => ({ ...item }));
                    console.log("Orders items: ", tempOrders);
                    setUserOrders(tempOrders);
                }
            });
        }
    };


    const getItem = id => {
        return products.find(item => item.id === id);
    };

    const handleDetail = id => {
        const product = getItem(id);
        setDetailProduct(product);
    };

    const addToCart = (user, id) => {
        let tempProducts = [...products];
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        product.total = product.price;

        setProducts(tempProducts);
        setCart([...cart, product]);
        setDetailProduct({ ...product });
    };

    const openModal = id => {
        const product = getItem(id);
        setModalProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const increment = id => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count += 1;
        product.total = product.count * product.price;

        setCart(tempCart);
        addTotals(cart);
    };

    const decrement = id => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count -= 1;

        if (product.count === 0) {
            removeItem(id);
        } else {
            product.total = product.count * product.price;
            setCart(tempCart);
        }
        addTotals(cart);
    };

    const getTotals = (cart) => {
        let subTotal = cart.reduce((acc, item) => acc + item.total, 0);
        const tax = parseFloat((subTotal * 0.1).toFixed(2));
        const total = subTotal + tax;
        return { subTotal, tax, total };
    };

    const addTotals = (cart) => {
        const totals = getTotals(cart);
        setCartSubTotal(totals.subTotal);
        setCartTax(totals.tax);
        setCartTotal(totals.total);
    };

    const removeItem = id => {
        let tempProducts = [...products];
        let tempCart = cart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        setCart(tempCart);
        setProducts(tempProducts);
        addTotals(cart);
    };

    const clearCart = () => {
        console.log("ORDER: ", order);
    };

    const createOrder = (axios, order, user, cart, totalPrice, callBack) => {
        console.log("Order request: ", order);
        const newOrder = { ...order };
        newOrder.user = user;
        newOrder.totalPrice = totalPrice;
        newOrder.status = "PENDING";
        newOrder.orderProducts = cart.map(cartItem => { 
            const orderProduct = new OrderProduct();
            orderProduct.product = cartItem;
            orderProduct.quantity = cartItem.count;
            orderProduct.unitePrice = cartItem.total;
            return orderProduct;
        });
        checkout(axios, newOrder, callBack);
    };

    // Add other methods as needed

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                detailProduct,
                cart,
                modalOpen,
                modalProduct,
                cartSubTotal,
                cartTax,
                cartTotal,
                order,
                orderProducts,
                handleDetail,
                addToCart,
                openModal,
                closeModal,
                increment,
                decrement,
                removeItem,
                clearCart,
                createOrder,
                fetchOrders,
                userOrders,
                allOrders,
                alert,
                handleShowAlert,
                handleCloseAlert,
                showAlert,
                getTotals
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };
