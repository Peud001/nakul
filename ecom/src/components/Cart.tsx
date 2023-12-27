import Nav from './Nav'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { getIncremented, getDecremented, getRemoved, getIsDisabled, getIsWarn, getTotalQty } from '../features/cartSlice' 
import Warn from './sub/Warn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface allType {
  id: number | string;
  thumbnail: string;
  title: string;
  rating: number;
  stock: number;
  price: number;
  images: string[];
  discountPercentage: number;
  itemQty : number
}

const Cart = () => {

  const navigate = useNavigate()

  const [itemRemove, setItemRemove] = useState<allType | undefined>()

  const dispatch = useAppDispatch()

  const items = useAppSelector(state => state.cart.cartItems)
  const itemStatus = useAppSelector(state => state.cart.isCartWarn)
  const isCartDisabled = useAppSelector(state => state.cart.isCartDisabled)
  const cartTotalPrice = useAppSelector(state => state.cart.cartTotalPrice)

  const incremented = (item: allType) => {
    dispatch(getIncremented(item))
    dispatch(getTotalQty())
  }
  const decremented = (item: allType) => {
    dispatch(getDecremented(item))
    setItemRemove(item);
    dispatch(getTotalQty())
  }
  const handleRemove = () => {
      if(itemRemove){
        dispatch(getRemoved(itemRemove));
      }
  }

    const handleNavigate = () => {
    navigate('/')
  }

  return (
    <section>
      <Nav/>
      <div>{itemStatus? <Warn onRemove={handleRemove}/> : ''}</div>
      <div className={`cart-section ${isCartDisabled? 'disabled' : ''}`}>
        <div className="cart-container">
          {items.map((item, i) => (
            <div key={i} className="cart-col-1">
              <div className="cart-row-1">
                <div className="cart-image-div">
                  <img className="cart-image" src={item.thumbnail} />
                  <div className="cart-title-price">
                    <div>{item.title}</div>
                    <div>${item.price.toFixed(2)}</div>
                  </div>
                </div>
                <div className="cart-total">${(item.price * item.itemQty).toFixed(2)}</div>
              </div>
              <div className="cart-row-2">
                <div>
                  <button onClick={() => {dispatch(getIsDisabled(true)); dispatch(getIsWarn(true)), setItemRemove(item)}} className="cart-remove">Remove</button>
                </div>
                <div className="cart-qty">
                  <button
                    onClick={() => decremented(item)}
                    className="cart-btn"
                  >
                    -
                  </button>
                  <div>{item.itemQty}</div>
                  <button onClick={() => incremented(item)} className="cart-btn">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-col-2">
          <h3>CART SUMMARY</h3>
          <div className="cart-subtotal">
            <div>Subtotal</div>
            <div>${cartTotalPrice.toFixed(2)}</div>
          </div>
          <div>
            <button className="cart-subtotal-btn">CHECKOUT (${cartTotalPrice.toFixed(2)})</button>
            <div onClick={handleNavigate}>Continue Shopping</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart