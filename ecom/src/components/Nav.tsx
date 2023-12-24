import { ChangeEvent, useState, MouseEvent, TouchEvent, FormEvent, useEffect } from "react";
import { CategoriesData } from "./sub/CategoriesData";
import { fetchAll, getApi, getNoMatch } from "../features/allSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useNavigate } from "react-router-dom";
import { getTotalPrice } from "../features/cartSlice";

interface categoriesType{
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

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const all = useAppSelector(state => state.all.all)
  const totalQty = useAppSelector((state) => state.cart.totalQty);
  
  const [options, setOptions] = useState<string | undefined>('')
  const [result, setResult] = useState<categoriesType[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const input = e.target.value
    setOptions(input)

    const pattern = new RegExp(`^${input}`, 'i')
    if(input && input.length > 0){
      const filteredResult = CategoriesData.filter(item => pattern.test(item.title.toLowerCase()))
      setResult(filteredResult)
    }
    else{
      setResult([])
    } 
  }

  const handleClick = (item: categoriesType) => {
    const url = item.url
    localStorage.setItem('api', JSON.stringify(url))
    dispatch(getApi())
    dispatch(fetchAll())
    setOptions(item.title)
    setResult([])
  }

  const handleCloseOptions = (e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setOptions("")
    setResult([])
  }
  useEffect(() => {
    dispatch(getTotalPrice())
  }, [totalQty])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(options){
      const filterSearch = all.filter((item: allType) => item.title.toLowerCase().includes(options.toLowerCase()))
      if(filterSearch.length < 1){
        dispatch(getNoMatch(options))
        setOptions('')
        navigate('/notFound')
      }
    }
  }
  const handleLogo = () => {
    navigate('/')
  }
  const handleCart = () => {
    navigate('/cart')
  }


  return (
    <section className="common-settings nav-section">
      <div className="nav">
        <div onClick={handleLogo} className="nav-logo">Logo</div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)} className="search-form">
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
                fill="#808080"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            <button onClick={(e) => handleCloseOptions(e)} type="submit" className="search-close-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </form>
          <div className="search-options-container">
            {
              result && result.map((item, i) => <div key={i}>
                <div className="search-options" onClick={() => handleClick(item)}>{item.title}</div>
              </div>)
            }
          </div>
        </div>
        <div onClick={handleCart} className="nav-cart-icon-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#808080"
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
