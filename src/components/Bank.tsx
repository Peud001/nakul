import { useEffect } from 'react';
import Nav from './Nav'
import { getNavLogo } from '../features/allSlice';
import { useAppDispatch } from '../app/hook';

const Bank = () => {

  const dispatch = useAppDispatch()

   useEffect(() => {
     dispatch(getNavLogo(true));
   }, []);

  return (
    <div>
      <Nav/>
      <h1 className='bank'>Banking Page</h1>
    </div>
  )
}

export default Bank