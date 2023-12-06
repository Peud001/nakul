import Categories from "./sub/Categories";
import Discount from "./sub/Discount";
import Price from "./sub/Price";


const Sidebar = () => {

 

  return (
    <section className="categories-section">
      <div><Categories/></div>
      <div><Price/></div>
      <Discount/>
    </section>
  );
};

export default Sidebar;
