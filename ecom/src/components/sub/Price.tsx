import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { getFilteredPrice, getIsNotPriceRange, getIsOpen, getValues } from "../../features/allSlice";
import axios from "axios";

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
  itemQty : number
}

const Price = () => {
  const dispatch = useAppDispatch();
  const api = useAppSelector(state => state.api.api)
  const [data, setData] = useState<allType[]>([])

  const prices = data
    .map((item: allType) => item.price)
    .filter((price) => isFinite(price))
    .sort((a, b) => a - b);

  const initialMin = prices.length > 0 ? prices[0] : 0;
  const initialMax = prices.length > 0 ? prices[prices.length - 1] : 0;

  const [values, setValues] = useState<number[]>([initialMin, initialMax]);

  useEffect(() => {
    const fetchItems = async() => {
      const res = await axios.get(api)
      const result = res?.data.products
      setData(result)
      dispatch(getValues(values))
    }
    fetchItems()
  }, [values])

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
    const filteredData = data.filter((item: allType) => item.price >= values[0] && item.price <= values[1])
    if (filteredData.length > 0){
      dispatch(getFilteredPrice(filteredData));
      dispatch(getIsNotPriceRange(false))
      localStorage.setItem("discountData", JSON.stringify(filteredData));
    }else{
      dispatch(getIsNotPriceRange(true))
    }
    dispatch(getIsOpen())
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
            step={1}
            onChange={handleChange}
            value={values}
            handleStyle={{
              backgroundColor: "#E07E1B",
              borderColor: "#E07E1B",
            }}
            trackStyle={{ backgroundColor: "#E07E1B" }}
            railStyle={{backgroundColor : "#808080"}}
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
