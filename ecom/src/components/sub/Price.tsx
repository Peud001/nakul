import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { getFilteredPrice } from "../../features/allSlice";

interface allType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [];
}

const Price = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.all.all);

  const prices = data
    .map((item: allType) => item.price)
    .filter((price) => isFinite(price))
    .sort((a, b) => a - b);

  const initialMin = prices.length > 0 ? prices[0] : 0;
  const initialMax = prices.length > 0 ? prices[prices.length - 1] : 0;

  const [values, setValues] = useState<number[]>([initialMin, initialMax]);

  useEffect(() => {
    setValues([initialMin, initialMax]);
  }, [initialMin, initialMax]);

  const handleOnChange = (newValues: number[]) => {
    setValues(newValues);
  };

  const handleChange = (value: number | number[]) => {
    handleOnChange(
      Array.isArray(value) ? [value[0], value[1]] : [value, value]
    );
  };

  const handleApply = () => {
    dispatch(getFilteredPrice(values));
  };

  return (
    <section>
      <div className="categories filter">Price</div>
      <div>
        <div className="price-range">
          <div className="min">${values[0]}</div>
          <div className="max">${values[1]}</div>
        </div>
        <div className="slider-container">
          <Slider
            range
            className="slider"
            min={prices.length > 0 ? prices[0] : 0}
            max={prices.length > 0 ? prices[prices.length - 1] : 0}
            step={10}
            onChange={handleChange}
            value={values}
          />
        </div>
        <button className="apply" type="submit" onClick={handleApply}>
          Apply
        </button>
      </div>
    </section>
  );
};

export default Price;
