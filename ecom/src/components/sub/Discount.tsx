import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getDiscount } from "../../features/allSlice";
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
}

const Discount = () => {

  const url = useAppSelector(state => state.all.api)

  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number>(0);
  const [result, setResult] = useState<allType[]>([])

   useEffect(() => {
     localStorage.setItem(
       "api",
       JSON.stringify("https://dummyjson.com/products/")
     )
   }, []);


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
      }, [result, dispatch, value])

  return (
    <section>
      <div className="categories">Discount</div>
      <div className="discount">
        {discounts.map((item, i) => (
          <div key={i}>
            <input
              type="radio"
              name="price"
              id={`discount-${i}`}
              onClick={() => setValue(item.percent)}
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
