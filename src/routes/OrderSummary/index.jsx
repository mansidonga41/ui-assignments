import { useAtom } from "jotai";
import { cartData } from "../../jotai/addToCart";
import "./OrderSummary.scss";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function OrderSummary() {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useAtom(cartData);

  return (
    <>
      <div className="order-summary-all-details-content-alignment">
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
            <h1>Order Summary</h1>
          </div>
          <div className="all-grid-items-alignment">
            {cartItem?.length == 0 ? (
              <>
                <span className="empty-cart-wrapper">
                  <a href="/" className="click-here-link">
                    Click here
                  </a>
                  &nbsp;to continue shopping.
                </span>
              </>
            ) : (
              <>
                {cartItem?.map((item, index) => {
                  return (
                    <div className="grid" key={index}>
                      <div className="grid-items">
                        <div className="image">
                          <img src={item?.thumbnail} />
                        </div>
                      </div>
                      <div className="grid-items">
                        <div className="child-text">
                          <p>{item?.title}</p>
                          <h6>{item?.description}</h6>
                        </div>
                        <div className="two-text-content-alignment">
                          <p>
                            Price: <span>{item?.totalPrice}</span>
                          </p>
                          <p>
                            Quantity: <span>{item?.quantity}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          {cartItem?.length == 0 ? (
            <></>
          ) : (
            <>
              <div
                className="pay-button"
                onClick={() => {
                  setCartItem([]);
                  navigate("/proceed-to-pay");
                }}
              >
                <button>Proceed To Pay</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
