import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import img1 from '../../asset/notFound.png'

const NotFound = () => {

    const keyword = useAppSelector(state => state.all.noMatch)

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
      <Link to="/">
        <button className="notFound-btn" type="submit">Return to Home Page</button>
      </Link>
    </div>
  );
}

export default NotFound