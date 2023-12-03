import { useState } from "react";
import { useAppDispatch } from "../../app/hook";
import { fetchAll, getApi } from "../../features/allSlice";

interface sidebarItemsType {
  title: string;
  url: string;
}

const Categories = () => {
  const dispatch = useAppDispatch();

  const [isClass, setClass] = useState(false);

  const categories: sidebarItemsType[] = [
    { title: "All categories", url: "https://dummyjson.com/products/" },
    {
      title: "Smartphones",
      url: "https://dummyjson.com/products/category/smartphones",
    },
    {
      title: "Laptops",
      url: "https://dummyjson.com/products/category/laptops",
    },
    {
      title: "Fragrances",
      url: "https://dummyjson.com/products/category/fragrances",
    },
    {
      title: "Skincare",
      url: "https://dummyjson.com/products/category/skincare",
    },
    {
      title: "Groceries",
      url: "https://dummyjson.com/products/category/groceries",
    },
    {
      title: "Home Decoration",
      url: "https://dummyjson.com/products/category/home-decoration",
    },
    {
      title: "Furniture",
      url: "https://dummyjson.com/products/category/furniture",
    },
    { title: "Tops", url: "https://dummyjson.com/products/category/tops" },
    {
      title: "Women's dresses",
      url: "https://dummyjson.com/products/category/womens-dresses",
    },
    {
      title: "Women's shoes",
      url: "https://dummyjson.com/products/category/womens-shoes",
    },
    {
      title: "Women's watches",
      url: "https://dummyjson.com/products/category/womens-watches",
    },
    {
      title: "Women's bags",
      url: "https://dummyjson.com/products/category/womens-bags",
    },
    {
      title: "Women's jewellery",
      url: "https://dummyjson.com/products/category/womens-jewellery",
    },
    {
      title: "Men's shirts",
      url: "https://dummyjson.com/products/category/mens-shirts",
    },
    {
      title: "Men's shoes",
      url: "https://dummyjson.com/products/category/mens-shoes",
    },
    {
      title: "Men's watches",
      url: "https://dummyjson.com/products/category/mens-watches",
    },
    {
      title: "Sunglasses",
      url: "https://dummyjson.com/products/category/sunglasses",
    },
    {
      title: "Automotive",
      url: "https://dummyjson.com/products/category/automotive",
    },
    {
      title: "Motocycle",
      url: "https://dummyjson.com/products/category/motorcycle",
    },
    {
      title: "Lighting",
      url: "https://dummyjson.com/products/category/lighting",
    },
  ];

  const handleClick = () => {
    setClass(prev => !prev);
  };

  const handleApi = (item: sidebarItemsType) => {
    dispatch(getApi(item.url));
    dispatch(fetchAll());
    setClass(prev => !prev);
  };

  return (
    <section>
      <div className="search-bar-section">
        <div onClick={handleClick} className="categories">
          Categories
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </span>
        </div>
        <div className={isClass ? "search-bar-div-on" : "search-bar-div-off"}>
          {categories.map((item, index) => {
            return (
              <div
                onClick={() => handleApi(item)}
                className="custom-dropdown-options"
                key={index}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
function setClass(arg0: boolean) {
  throw new Error("Function not implemented.");
}
