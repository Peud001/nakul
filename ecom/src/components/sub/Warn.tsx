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
            </div>
            <p>Do you really want to remove this item from cart?</p>
            <div className="warn-btn-container">
              <button className="warn-btn1" onClick={handleRemove}>
                REMOVE ITEM
              </button>
              <button className="warn-btn2" onClick={handleClick}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Warn