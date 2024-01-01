import { useAppSelector } from "../../app/hook";
import img1 from '../../asset/notFound.png'
import { useAppDispatch } from "../../app/hook";
import { getIsNotFound } from "../../features/allSlice";
import { Link } from "react-router-dom";


const NotFound = () => {


    const dispatch = useAppDispatch()

    const keyword = useAppSelector(state => state.all.noMatch)

    const handleClick = () => {
      dispatch(getIsNotFound(false))
    }

  return (
    <div className="notFound">
      <img src={img1} />
      <p>There are no results for {keyword}</p>
      <div>Check your spelling for typing errors</div>
      <div>Try searching with short and simple keywords</div>
      <div>
        Try searching more general terms - you can then filter the search
        results
      </div>
        <Link to='/' onClick={handleClick} className="notFound-btn">Return to Home Page</Link>
    </div>
  );
}

export default NotFound