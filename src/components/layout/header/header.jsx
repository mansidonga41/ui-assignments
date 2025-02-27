import React, { useEffect, useState } from "react";
import Topbar from "../Topbar";
import "./header.scss";
import CartIcon from "../../../assets/icons/cart.png";
import SearchIcon from "../../../assets/icons/search.svg";
import { useAtom } from "jotai";
import {
  cartData,
  cartQuantity,
  originalProductsData,
  productsData,
} from "../../../jotai/addToCart";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const [cartItem, setCartItem] = useAtom(cartData);
  const [products, setProducts] = useAtom(productsData);
  const [originalProducts, setOriginalProducts] = useAtom(originalProductsData);
  const [totalCartQuantity, setTotalCartQuantity] = useAtom(cartQuantity);
  const navigate = useNavigate();

  const searchProducts = (query) => {
    if (query.length > 0) {
      const filteredProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(originalProducts);
    }
  };

  useEffect(() => {
    const totalQuantity = cartItem.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    setTotalCartQuantity(totalQuantity);
  }, [cartItem]);

  return (
    <>
      <Topbar />
      <header>
        <div className="container">
          <div className="header-alignment">
            <div
              className="logo"
              onClick={() => {
                navigate("/");
              }}
            >
              <span>Logo.</span>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Search for products"
                onInput={(e) => {
                  searchProducts(e.target.value);
                }}
              />
              <div className="search-icon">
                <img src={SearchIcon} alt="SearchIcon" />
              </div>
            </div>
            <div className="other-content">
              <div
                className="cart-icon-text"
                onClick={() => {
                  navigate("/my-cart");
                }}
              >
                <div className="relative-div">
                  <img src={CartIcon} alt="CartIcon" />
                  <div className="edge">{totalCartQuantity}</div>
                </div>
                <p>Shopping Cart</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
