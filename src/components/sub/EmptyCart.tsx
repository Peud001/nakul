import { Link } from 'react-router-dom';
import emptyCart from '../../asset/emptyCart.jpgq'

const EmptyCart = () => {
  return (
    <div className="notFound-route">
      <img src={emptyCart} />
      <h3>Your Cart is as Empty</h3>
      <p>
        Explore our products and discover something special to add to your cart.
      </p>
      <Link to="/nakul">
        <button className="notFound-btn">Start Shopping</button>
      </Link>
    </div>
  );
}

export default EmptyCart