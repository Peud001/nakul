import { useAppDispatch } from "../../app/hook";
import { fetchAll, getIsNotFound, getIsNotPriceRange } from "../../features/allSlice";
import { updateApi } from "../../features/apiSlice";

interface sidebarItemsType {
  title: string;
  url: string;
}

const Categories = () => {
  const dispatch = useAppDispatch();

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

  const handleApi = (item: sidebarItemsType) => {
    const url = item.url
    console.log(url)
    localStorage.setItem('api', JSON.stringify(url))
    dispatch(updateApi(url))
    dispatch(fetchAll());
    dispatch(getIsNotFound(false))
    dispatch(getIsNotPriceRange(false))
  };

  return (
    <section>
      <div className="search-bar-section">
        <div className="categories cat">
          Categories
        </div>
        <div className="search-bar-div-on">
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
