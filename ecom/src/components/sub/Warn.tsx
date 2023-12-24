import { useAppSelector, useAppDispatch } from "../../app/hook";
import { getIsDisabled, getIsWarn, getTotalQty} from "../../features/cartSlice";

interface warnProp{
    onRemove : () => void
}

const Warn = ({ onRemove }: warnProp) => {
  const status = useAppSelector((state) => state.cart.isCartWarn);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(getIsWarn(false));
    dispatch(getIsDisabled(false));
  };
  const handleRemove = () => {
    onRemove()
    dispatch(getIsWarn(false));
    dispatch(getIsDisabled(false));
    dispatch(getTotalQty())
  };

  return (
    <section>
      {status ? (
        <div className="cart-remove-warn-container">
          <div className="cart-remove-warn">
            <div>
              <h3>Remove from cart</h3>
              <p onClick={handleClick}>X</p>
            </div>
            <p>Do you really want to remove this item from cart</p>
            <button onClick={handleRemove}>REMOVE ITEM</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Warn