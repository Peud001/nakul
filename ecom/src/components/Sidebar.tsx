import Categories from "./sub/Categories";
import Discount from "./sub/Discount";
import Price from "./sub/Price";
import { useAppSelector } from "../app/hook";


const Sidebar = () => {

  const isOpen = useAppSelector(state => state.all.isOpened)
  const handleLogo = () => {}

  return (
    <section className={`categories-section ${isOpen? 'active' : ''}`}>
      <div onClick={handleLogo} className="sidebar-logo">
        Logo
      </div>
      <div>
        <Categories />
      </div>
      <div>
        <Price />
      </div>
      <Discount />
    </section>
  );
};

export default Sidebar;
