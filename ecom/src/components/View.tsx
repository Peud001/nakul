import { useEffect, useState } from "react";
import Nav from "./Nav";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getCart, getTotalQty } from "../features/cartSlice";

interface allType {
  id: number | string;
  thumbnail: string;
  title: string;
  rating: number;
  stock: number;
  price: number;
  images: string[];
  discountPercentage: number;
  itemQty: number
}

const View = () => {

  const dispatch = useAppDispatch()

  const cartItems = useAppSelector(state => state.cart.cartItems)

  const prev = JSON.parse(localStorage.getItem('preview') ?? '')

  const [viewImage, setViewImage] = useState<string>(prev.thumbnail)
  const [cartCount, setCartCount] = useState<allType>()
  
  const handleImage = (image: string) => {
    setViewImage(image)
  }
  const handleCart = (prev: allType) => {
    dispatch(getCart(prev))
    dispatch(getTotalQty())
  }

  useEffect(() => {
    const item = cartItems.find((cartItem: allType) => cartItem.id === prev.id)
    setCartCount(item)
  }, [prev])

  return (
    <section>
      <Nav />
      <div className="prev-section">
        <div className="prev">
          <div className="prev-pics">
            <img className="prev-thumbnail" src={viewImage} />
            <div>
              {prev.images.map((image: string, i: number) => (
                  <img
                    key={i}
                    onClick={() => handleImage(image)}
                    className={`prev-images ${
                      image === viewImage ? "enlargeImage" : ""
                    }`}
                    src={image}
                  />
              ))}
            </div>
          </div>
          <div className="prev-info">
            <h4>{prev.title}</h4>
            <div className="prev-price">
              <div>${prev.price}</div>
              <div>
                ${prev.price + (prev.price * prev.discountPercentage) / 100}
              </div>
              <div>-{prev.discountPercentage}%</div>
            </div>
            <div className="prev-rating-stock">
              <div className="rating-all">
                <div className="rating-star">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </div>
                <div>{prev.rating.toFixed(1)}</div>
              </div>
              <div>{prev.stock} sold</div>
            </div>
            <div className="prev-button">
              <button onClick={() => handleCart(prev)} className="view-button">
                Add to Cart
              </button>
              {cartCount ? (
                <div className="cart-count">
                  {cartCount.itemQty} of this item has been added to cart
                </div>
              ) : (
                ""
              )}
              <div>Continue shopping</div>
            </div>
          </div>
        </div>
        <div className="description">
          <h4>Description</h4>
          <p>{prev.description}</p>
        </div>
      </div>
    </section>
  );
}

export default View