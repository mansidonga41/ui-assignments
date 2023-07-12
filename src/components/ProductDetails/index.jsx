import React from "react";
import ProductCounter from "../ProductCounter";
import "./ProductDetails.scss";
import { cartData } from "../../jotai/addToCart";
import { useAtom } from "jotai";
import { toast } from "react-hot-toast";
export default function ProductDetails(props) {
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
    <div>
      {toogle && <div className="modal-blur"></div>}
      <div className={toogle ? "moda-md show" : "moda-md hide"}>
        <div className="modal-header">
          <span>Product Details</span>
          <i onClick={() => setToogle(false)} className="fa-solid fa-xmark"></i>
        </div>
        <div className="modal-body">
          <div className="grid">
            <div className="grid-items">
              <div className="lg-image">
                <img src={props.selectedProduct?.thumbnail} alt="thumbnail" />
              </div>
              <div className="image-grid">
                {props.selectedProduct?.images.map((image, index) => {
                  return (
                    <div className="image-grid-items" key={index}>
                      <img src={image} alt="thumbnail" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid-items">
              <div className="text-style">
                <h2>{props.selectedProduct?.title}</h2>
                <p>{props.selectedProduct?.description}</p>
                <h4>$ {props.selectedProduct?.price}</h4>
              </div>
              <div className="counter-details">
                <ProductCounter
                  quantity={props.selectedProduct?.quantity}
                  id={props.selectedProduct?.id}
                  index={props.selectedIndex}
                  setProductsList={props.setProductsList}
                  productsList={props.productsList}
                  type="product"
                />
              </div>
              <div className="two-text">
                <p>
                  Category: <span>{props.selectedProduct?.category}</span>
                </p>
              </div>
              <div
                className="add-to-cart"
                onClick={(e) => {
                  onAddCart(e, props.selectedProduct);
                }}
              >
                <button>Add to Cart</button>
              </div>
              <div className="two-text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
