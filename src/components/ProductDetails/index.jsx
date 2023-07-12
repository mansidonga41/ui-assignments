import React from "react";
import ProductCounter from "../ProductCounter";
import "./ProductDetails.scss";
import { cartData, cartQuantity } from "../../jotai/addToCart";
import { useAtom } from "jotai";
import { toast } from "react-hot-toast";
import Rating from "react-rating";
export default function ProductDetails(props) {
  const { toogle, setToogle } = props;
  const [cartItem, setCartItem] = useAtom(cartData);
  const [totalCartQuantity, setTotalCartQuantity] = useAtom(cartQuantity);

  const onAddCart = (e, product) => {
    e.stopPropagation();
    let cartData = [...cartItem];

    let filteredData = cartData.findIndex((c) => c.id == product.id);
    if (filteredData !== -1) {
      cartData[filteredData].quantity += 1;
      setCartItem(cartData);

      const totalQuantity = cartData.reduce(
        (sum, product) => sum + product.quantity,
        0
      );
      setTotalCartQuantity(totalQuantity);
      toast.success("Added to cart!");
    } else {
      setCartItem([...cartItem, product]);
      const totalQuantity = cartData.reduce(
        (sum, product) => sum + product.quantity,
        0
      );
      setTotalCartQuantity(totalQuantity);
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
              <div className="new-grid">
                <div className="new-grid-items">
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
                <div className="new-grid-items">
                <div className="lg-image">
                  <img src={props.selectedProduct?.thumbnail} alt="thumbnail" />
                </div>
                </div>
              </div>
              
             
            </div>
            <div className="grid-items">
              <div className="text-style">
                <h2>{props.selectedProduct?.title}</h2>
                <p>{props.selectedProduct?.description}</p>
                <p>
                  {props.selectedProduct?.stock > 3 ? (
                    <>
                      <b className="in-stock-wrapper">In stock</b>
                    </>
                  ) : (
                    <>
                      <b>Hurry! Only few items left</b>
                    </>
                  )}
                </p>
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
                <p className="rating-main-wrapper">
                  <span className="rating-count">
                    {props.selectedProduct?.rating}
                  </span>
                  <Rating
                    className="rating-wrappper"
                    placeholderRating={props.selectedProduct?.rating}
                    emptySymbol="fa fa-star-o fa-1x"
                    placeholderSymbol="fa fa-star fa-1x"
                    fullSymbol="fa fa-star fa-1x"
                    readonly
                  />
                </p>
                <p>
                  Brand: <span>{props.selectedProduct?.brand}</span>
                </p>
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
