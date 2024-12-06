import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import {ButtonContainer} from './Button';
import useAuth from "../hooks/useAuth";


const Navbar = () => {
    const { auth } = useAuth();
    return (
        <NavWrapper className="navbar nav-bar-expand-sm navbar-dark px-sm-5">
               <Link to='/'>
                  <ButtonContainer>
                       <b><span>WEB/TECH</span></b>
                  </ButtonContainer>

               </Link>
               <ul className="navbar-nav align-items-center d-flex  flex-row">
                 <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                       Products
                    </Link>
                 </li>
                   <li className="nav-item ml-5">
                       <Link to="/user/orders" className="nav-link">
                           Orders
                       </Link>
                   </li>
               </ul>
               <div>
                   {auth?.token && (
                       <div className={"d-flex flex-row"}>
                           {auth?.profile?.role === "ADMIN" && (
                               <div>
                                   <Link to="/product/create" className="ml-auto">
                                       <ButtonContainer>
                                           Add new products
                                       </ButtonContainer>
                                   </Link>
                               </div>
                           )}
                           {auth?.profile?.role !== "ADMIN" && (
                               <div>
                                   <Link to="/cart" className="ml-auto">
                                       <ButtonContainer>
                                           <i className="fas fa-cart-plus"></i>
                                       </ButtonContainer>
                                   </Link>
                               </div>
                           )}

                           <Link to="/logout" className="ml-auto">
                               <ButtonContainer>
                                   <i className="fas fa-sign-out-alt"></i>
                               </ButtonContainer>
                           </Link>
                       </div>
                   )}
                   {!auth?.token && (<div><Link to="/login" className="ml-auto">
                       <ButtonContainer>
                           Login
                       </ButtonContainer>
                   </Link>
                       <Link to="/signup" className="ml-auto">
                           <ButtonContainer>
                               Signup
                           </ButtonContainer>
                       </Link></div>)}
               </div>
            </NavWrapper>
    )
}

const NavWrapper = styled.nav`
background:var(--mainBlue);
.nav-link{
    color:var(--mainWhite) !important;
    font-size:1.3 rem;
    text-transform:capitalize;
}
`;

export default Navbar;
