import Categories from "./sub/Categories";
import Discount from "./sub/Discount";
import Price from "./sub/Price";
import { useAppSelector } from "../app/hook";
import logo from '../asset/logo.png'


const Sidebar = () => {

  const isOpen = useAppSelector(state => state.all.isOpened)
  const handleLogo = () => {}

  return (
    <section className={`categories-section ${isOpen ? "active" : ""}`}>
      <div onClick={handleLogo} className="sidebar-logo">
        <img className="nav-image-logo" src={logo} />
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
