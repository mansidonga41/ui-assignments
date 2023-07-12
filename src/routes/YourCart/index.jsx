import React, { useEffect } from "react";
import CartItems from "./CartItems";
import "./YourCart.scss";
import { cartData, cartTotalPrice } from "../../jotai/addToCart";
import { useAtom } from "jotai";

export default function YourCart() {
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
                  <span>No Items in cart</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
