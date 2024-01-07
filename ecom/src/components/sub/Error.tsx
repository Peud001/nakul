import { Link } from 'react-router-dom'
import error from '../../asset/error.jpg'
import Nav from '../Nav'
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hook';
import { getNavLogo } from '../../features/allSlice';

const Error = () => {

  const dispatch = useAppDispatch()

   useEffect(() => {
     dispatch(getNavLogo(true));
   }, []);

  return (
    <section>
      <Nav />
      <div className="notFound-route">
        <img src={error} />
        <h3>Not Found</h3>
        <p>We couldn't fine the page you are looking for</p>
        <Link className="notFound-btn" to="/">
          Return to Homepage
        </Link>
      </div>
    </section>
  );
}

export default Error