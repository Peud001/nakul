import { useState } from "react";
import { Link } from "react-router-dom";

interface sidebarItemsType {
    title : string
    path : string
}

const Sidebar = () => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const sidebarItems: sidebarItemsType[] = [
    { title: "All categories", path: "/" },
    { title: "Men's clothing", path: "/men" },
    { title: "Women's clothing", path: "/women" },
    { title: "Jewelery", path: "/jewel" },
    { title: "Electronics", path: "/elect" },
  ];

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex? null : index )
  }

  return (
    <section 
    className="search-bar-section">
        <p className="categories">categories</p>
      <div className="search-bar-div">
        {sidebarItems.map((item, index) => {
          return (
            <div key={index}>
              <Link to={item.path} className="search-bar-links"
              >
                <div onClick={() => handleClick(index)} className={`search-bar-items ${index === activeIndex? 'sidebar-item-active' : ''}`}>{item.title}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
