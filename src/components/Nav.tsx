import {
  ChangeEvent,
  useState,
  MouseEvent,
  TouchEvent,
  FormEvent,
  useEffect,
} from "react";
import {
  fetchAll,
  getFilteredSearch,
  getIsNotFound,
  getIsNotPriceRange,
  getIsOpen,
  getNoMatch,
  getSearchOptions,
} from "../features/allSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useNavigate } from "react-router-dom";
import { getTotalPrice } from "../features/cartSlice";
import { updateApi } from "../features/apiSlice";
import axios from "axios";
import logo from "../asset/logo.png"

interface categoriesType {
  title: string;
  url: string;
}

interface allType {
  id: number | string;
  thumbnail: string;
  title: string;
  rating: number;
  stock: number;
  price: number;
  images: string[];
  discountPercentage: number;
}

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalQty = useAppSelector((state) => state.cart.totalQty);
  const searchOptions = useAppSelector((state) => state.all.searchOptions)
  const isOpen = useAppSelector(state => state.all.isOpened)
  const isNavLogo = useAppSelector(state => state.all.isNavLogo)

  const [options, setOptions] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target.value;
    dispatch(getSearchOptions(input));
    setOptions(input);
  };

  const handleClick = (item: categoriesType) => {
    const url = item.url;
    dispatch(updateApi(url))
    dispatch(fetchAll());
    setOptions(item.title);
    dispatch(getSearchOptions(''))
    dispatch(getIsNotFound(false));
    dispatch(getIsNotPriceRange(false))
  };

  const handleCloseOptions = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    setOptions("");
  };
  useEffect(() => {
    dispatch(getTotalPrice());
  }, [totalQty]);

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.get("https://dummyjson.com/products/");
    const all = res?.data.products
    const filterSearch = all.filter((item: allType) =>
      item.title.toLowerCase().includes(options.toLowerCase())
    )
    if (filterSearch.length >= 1) {
      dispatch(getFilteredSearch(filterSearch));
      dispatch(getIsNotFound(false));
      dispatch(getSearchOptions(""));
      dispatch(getIsNotPriceRange(false));
      navigate('/nakul')
    } else {
      dispatch(getNoMatch(options));
      setOptions("");
      dispatch(getIsNotFound(true));
      dispatch(getSearchOptions(""));
      dispatch(getFilteredSearch([]))
      dispatch(getIsNotPriceRange(false));
      navigate("/nakul");
    }
  };

  const handleLogo = () => {
    navigate("/nakul")
    dispatch(getSearchOptions(''))
  };
  const handleCart = () => {
    navigate("/cart")
    dispatch(getSearchOptions(""));
  }
  const toggleHamburger = () => {
     dispatch(getIsOpen())
  }
  
  return (
    <section className="common-settings nav-section">
      <div className="nav">
        <div
          onClick={handleLogo}
          className={`nav-logo ${isNavLogo ? "show-logo" : ""}`}
        >
          <img className="nav-image-logo" src={logo}/>
        </div>
        <div
          className={
            `nav-menu ${isNavLogo
              ? "show-menu"
              : isOpen
              ? "open-menu-active"
              : "close-menu-active"}`
          }
          onClick={toggleHamburger}
        >
          <div className="hamburger-menu"></div>
        </div>
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={`search-form ${isOpen ? "disable" : ""}`}
          >
            <input
              className="nav-input"
              placeholder="Search products..."
              value={options}
              onChange={(e) => handleChange(e)}
            />
            <button className="nav-search-button" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#E07E1B"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            <button
              onClick={(e) => handleCloseOptions(e)}
              type="submit"
              className="search-close-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="#808080"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </form>
          <div className="search-options-container">
            {searchOptions &&
              searchOptions.map((item, i) => (
                <div key={i}>
                  <div
                    className="search-options"
                    onClick={() => handleClick(item)}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div onClick={handleCart} className="nav-cart-icon-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#E07E1B"
            className="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <span className="cart-quantity">{totalQty}</span>
        </div>
      </div>
    </section>
  );
};

export default Nav;
