import React from "react";
import "./CartItems.scss";
import ProductCounter from "../../../components/ProductCounter/index";
import { useAtom } from "jotai";
import { cartData } from "../../../jotai/addToCart";
import { toast } from "react-hot-toast";

export default function CartItems(props) {
  const [cartItem, setCartItem] = useAtom(cartData);

  const onDeleteCartItem = (id) => {
    let cartData = [...cartItem];

    let updatedCartData = cartData.filter((c) => c.id !== id);
    setCartItem(updatedCartData);
    toast.success("Removed item from cart!");
  };

  return (
    <div>
      <div className="cart-items-design">
        <div className="sub-grid">
          <div className="img">
            <img src="https://ideen-images.s3-ap-south-1.amazonaws.com/1654781391491.jpeg" />
          </div>
          <div>
            <div className="two-text">
              <p>{props?.item?.title}</p>
              <p>${props?.item?.totalPrice}</p>
            </div>
            <ProductCounter
              quantity={props.item?.quantity}
              index={props.index}
              id={props.item?.id}
              type="cart"
            />
            <div
              className="remove-icon"
              onClick={() => {
                onDeleteCartItem(props.item?.id);
              }}
            >
              <i className="fa-solid fa-trash-can"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
