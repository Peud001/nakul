import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getDiscount, getIsOpen } from "../../features/allSlice";
import axios from "axios";


interface discountsType {
  percent: number;
}

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

const Discount = () => {

  const url = useAppSelector(state => state.api.api)

  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number>(0);
  const [result, setResult] = useState<allType[]>([])

  const discounts: discountsType[] = [
    { percent: 10 },
    { percent: 8 },
    { percent: 6 },
    { percent: 4 },
    { percent: 2 },
  ];

  useEffect(() => {
    const fetchData = async () => {
    const res = await axios.get(url);
    const data = res?.data.products;
    setResult(data);
    };
    fetchData()
  }, [url]);

  useEffect(() => {
    const filteredDiscount = result.filter(
      (item: allType) => item.discountPercentage >= value
    );
    dispatch(getDiscount(filteredDiscount));
    dispatch(getIsOpen())
      }, [result, dispatch, value])

  const handleReset = () => {
    setValue(0)
  }    

  return (
    <section>
      <div className="discount-cat">
        <div className="discount-title">Discount</div>
        <button className="discount-reset" onClick={handleReset}>Reset</button>
      </div>
      <div className="discount">
        {discounts.map((item, i) => (
          <div key={i}>
            <input
              type="radio"
              name="price"
              id={`discount-${i}`}
              onChange={() => setValue(item.percent)}
              checked = {value === item.percent}
            />
            <label className="label" htmlFor={`discount-${i}`}>
              {item.percent}% or more
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Discount;
