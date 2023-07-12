import React from "react";
import "./ProductCounter.scss";
import { useAtom } from "jotai";
import { cartData, cartTotalPrice } from "../../jotai/addToCart";
export default function ProductCounter(props) {
  const [cartItem, setCartItem] = useAtom(cartData);
  const [cartItemsTotalPrice, setCartItemsTotalPrice] = useAtom(cartTotalPrice);

  const onIncrement = (e, index) => {
    e.stopPropagation();

    if (props.type == "product") {
      let updatedProduct = [...props.productsList];

      updatedProduct[index].quantity += 1;
      updatedProduct[index].totalPrice =
        updatedProduct[index].quantity * updatedProduct[index].price;
      props.setProductsList(updatedProduct);
    } else {
      let updatedCartItem = [...cartItem];

      updatedCartItem[index].quantity += 1;
      updatedCartItem[index].totalPrice =
        updatedCartItem[index].quantity * updatedCartItem[index].price;

      setCartItemsTotalPrice(updatedCartItem[index].totalPrice);
      setCartItem(updatedCartItem);
    }
  };

  const onDecrement = (e, index) => {
    e.stopPropagation();
    if (props.type == "product") {
      let updatedProduct = [...props.productsList];
      if (updatedProduct[index].quantity > 1) {
        updatedProduct[index].quantity -= 1;
        updatedProduct[index].totalPrice =
          updatedProduct[index].quantity * updatedProduct[index].price;
        props.setProductsList(updatedProduct);
      }
    } else {
      let updatedCartItem = [...cartItem];
      if (updatedCartItem[index].quantity > 1) {
        updatedCartItem[index].quantity -= 1;
        updatedCartItem[index].totalPrice =
          updatedCartItem[index].quantity * updatedCartItem[index].price;

        setCartItemsTotalPrice(updatedCartItem[index].totalPrice);
        setCartItem(updatedCartItem);
      }
    }
  };

  return (
    <div>
      <div className="product-counter-design">
        <div
          className="action-button"
          onClick={(e) => {
            onDecrement(e, props.index);
          }}
        >
          <i className="fa-solid fa-minus"></i>
        </div>
        <div className="counter">{props?.quantity}</div>
        <div
          className="action-button"
          onClick={(e) => {
            onIncrement(e, props.index);
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
}
