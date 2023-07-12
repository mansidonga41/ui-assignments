import React, { useEffect } from "react";
import CartItems from "./CartItems";
import "./YourCart.scss";
import { cartData, cartTotalPrice } from "../../jotai/addToCart";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function YourCart() {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useAtom(cartData);
  const [cartItemsTotalPrice, setCartItemsTotalPrice] = useAtom(cartTotalPrice);

  useEffect(() => {
    let cartData = [...cartItem];
    const totalPrice = cartData.reduce(
      (sum, product) => sum + product.totalPrice,
      0
    );
    setCartItemsTotalPrice(totalPrice);
  }, [cartItem]);

  return (
    <div>
      <div className="your-cart-all-details-alignment">
        <div className="container">
          <div
            className="go-to-home-page"
            onClick={() => {
              navigate("/");
            }}
          >
            <i class="fa-solid fa-chevron-left"></i>
            <span>Go To Home Page</span>
          </div>
          <div className="title">
            <h1>Your Cart</h1>
          </div>
          <div className="sub-text">
            <span>Cart Items</span>
          </div>
          <div className="grid">
            <div className="grid-items">
              {cartItem.length == 0 ? (
                <>
                  <span className="empty-cart-wrapper">
                    Your cart is empty.&nbsp;
                    <a href="/" className="click-here-link">
                      Click here
                    </a>
                    &nbsp;to continue shopping.
                  </span>
                </>
              ) : (
                <>
                  {cartItem?.map((item, index) => {
                    return <CartItems key={index} item={item} index={index} />;
                  })}
                </>
              )}

              <div className="total-amount">
                <p>Total Amount</p>
                <p>
                  <span>$ {cartItemsTotalPrice}</span>
                </p>
              </div>
              {cartItem.length == 0 ? (
                <></>
              ) : (
                <>
                  <div
                    className="order-summary-button-right-alignment"
                    onClick={() => {
                      navigate("/order-summary");
                    }}
                  >
                    <button>Place Order</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
