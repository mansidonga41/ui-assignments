import { useEffect, useState } from "react";
import ProductCounter from "../ProductCounter";
import ProductDetails from "../ProductDetails";
import "./SingleProduct.scss";
import { useAtom } from "jotai";
import { cartData } from "../../jotai/addToCart";
import { toast } from "react-hot-toast";

export default function SingleProduct(props) {
  const { toogle, setToogle } = props;
  const [cartItem, setCartItem] = useAtom(cartData);

  const onAddCart = (e, product) => {
    e.stopPropagation();
    let cartData = [...cartItem];

    let filteredData = cartData.filter((c) => c.id == product.id);
    if (filteredData.length == 0) {
      setCartItem([...cartItem, product]);
      toast.success("Added to cart!");
    }
  };

  return (
    <>
      <div
        className="single-product"
        onClick={(e) => {
          e.preventDefault();
          props.setSelectedProduct(props.product);
          props.setSelectedIndex(props.index);
          setToogle(!toogle);
        }}
      >
        <div className="card-image">
          <img src={props.product.thumbnail} alt="card-thumbnail" />
        </div>
        <div className="card-details">
          <h6>{props.product.title}</h6>
          <p>{props.product.description}</p>
          <h5>
            Price : <span>$ {props.product.price}</span>
          </h5>
          <div className="button-group-alignment">
            <ProductCounter
              quantity={props.product.quantity}
              id={props.product.id}
              index={props.index}
              setProductsList={props.setProductsList}
              productsList={props.productsList}
              type="product"
            />
            <button
              onClick={(e) => {
                onAddCart(e, props.product);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
