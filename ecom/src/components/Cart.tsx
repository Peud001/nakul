import Nav from './Nav'
import { useAppSelector } from '../app/hook' 

const Cart = () => {

  const items = useAppSelector(state => state.cart.cartItems)

  return (
    <section>
      <Nav />
      <div className="cart-section">
        <div className="cart-container">
          {items.map((item) => (
            <div className="cart-col-1">
              <div className="cart-row-1">
                <div className="cart-image-div">
                  <img className="cart-image" src={item.thumbnail} />
                  <div className="cart-title-price">
                    <div>{item.title}</div>
                    <div>${item.price}</div>
                  </div>
                </div>
                <div className="cart-total">$550</div>
              </div>
              <div className="cart-row-2">
                <div>
                  <button className="cart-remove">Remove</button>
                </div>
                <div className="cart-qty">
                  <button className="cart-btn">-</button>
                  <div>{item.itemQty}</div>
                  <button className="cart-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-col-2">
          <h3>CART SUMMARY</h3>
          <div className="cart-subtotal">
            <div>Subtotal</div>
            <div>$550</div>
          </div>
          <div>
            <button className="cart-subtotal-btn">CHECKOUT ($550)</button>
            <div>Continue Shopping</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart