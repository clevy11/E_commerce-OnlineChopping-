/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { ButtonLink, Button, FloatingButton } from './Buttons';
import { ToolBarTDP, Price, ItemFotter } from './Elements';
import ProductItem from './ProductItem';
import ProductItemHor from './ProductItemHor';

export default function Index() {
  return (
    <div className="container my-5">
      <div className="row">
        <hr />
        <h4>Buttons</h4>
        <h5>Avalable buttons</h5>

        <div>
          <hr />
          <h6>Button Links</h6>
          <div className="d-flex">
            <div className="px-1">
              <ButtonLink link="/" text="Add to cart" icon="bi bi-bag" />
            </div>
            <div className="px-1">
              <ButtonLink link="/" text="Add to cart" icon="bi bi-bag" />
            </div>
            <div className="px-1">
              <ButtonLink link="/" text="Add to cart" />
            </div>
          </div>
          <h6>Buttons</h6>
          <div className="d-flex">
            <div className="px-1">
              <Button link="/" text="Add to cart" icon="bi bi-bag" />
            </div>
            <div className="px-1">
              <Button link="/" text="Add to cart" icon="bi bi-bag" />
            </div>
            <div className="px-1">
              <Button link="/" text="Add to cart" />
            </div>
          </div>
          <h6>Floating Buttons</h6>
          <div className="d-flex">
            <div className="px-1">
              <FloatingButton link="/" text="-2%" icon="bi bi-bag" />
            </div>
            <div className="px-1">
              <FloatingButton link="/" text="-10%" icon="bi bi-bag" />
            </div>
          </div>
        </div>

      </div>
      <div className="row">
        <hr />
        <h4>Toolbar</h4>
        <div>
          <hr />
          <h6>Toolbar Links</h6>
          <div className="d-flex">
            <div className="px-1">
              <ToolBarTDP
                link="/login"
                icon="bi bi-person"
                title="Account"
                subtitle="Login / Signup"
                count={2}
              />
            </div>
            <div className="px-1">
              <ToolBarTDP
                link="/wishlist"
                icon="bi bi-heart"
                title="Wish List"
                subtitle="Eidt wish list"
                count={2}
              />
            </div>
            <div className="px-1">
              <ToolBarTDP
                link="/cart"
                icon="bi bi-bag-check"
                title="Cart"
                subtitle="$0.00"
                count={2}
              />
            </div>
          </div>
        </div>

      </div>
      <div className="row">
        <hr />
        <h4>Items</h4>
        <div>
          <hr />
          <h6>Prices</h6>
          <div className="d-flex flex-column">
            <div className="px-1">
              Width discount
              <Price
                discount={10}
                price={100}
              />
            </div>
            <div className="px-1">
              Without discount
              <Price
                price={100}
              />
            </div>
          </div>
        </div>
        <div>
          <hr />
          <h6>More</h6>
          <div className="d-flex flex-column">
            <div className="px-1">
              Width discount
              <ItemFotter />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <hr />
          <h6>Items</h6>
          <div className="d-flex flex-column">
            <div className="px-1">
              <div className="item-list d-flex col-12 flex-wrap">
                <div className="col-3 p-1">
                  <ProductItem />
                </div>
                <div className="col-3 p-1">
                  <ProductItem />
                </div>
                <div className="col-3 p-1">
                  <ProductItem />
                </div>
                <div className="col-3 p-1">
                  <ProductItem />
                </div>
                <div className="col-3 p-1">
                  <ProductItem />
                </div>
                <div className="col-3 p-1">
                  <ProductItem />
                </div>
                <div className="col-3 p-1">
                  <ProductItem />
                </div>
                <div className="col-3 p-1">
                  <ProductItem />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mt-5">
            <div className="px-1">
              <div className="item-list d-flex col-12 flex-wrap">
                <div className="col-10 p-1">
                  <ProductItemHor />
                </div>
                <div className="col-10 p-1">
                  <ProductItemHor />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
