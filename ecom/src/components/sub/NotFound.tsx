import { useAppSelector } from "../../app/hook";
import img1 from '../../asset/notFound.png'
import { useAppDispatch } from "../../app/hook";
import { fetchAll, getIsNotFound } from "../../features/allSlice";


const NotFound = () => {


    const dispatch = useAppDispatch()

    const keyword = useAppSelector(state => state.all.noMatch)

    const handleClick = () => {
      dispatch(fetchAll())
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
        <button onClick={handleClick} className="notFound-btn" type="submit">Return to Home Page</button>
    </div>
  );
}

export default NotFound