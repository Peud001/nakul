import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

const Layout = () => {
    return(
        <section className="layout-section">
            <div className="layout-nav"><Nav/></div>
            <div className="layout-sidebar"><Sidebar/></div>
            <div className="layout-outlet"><Outlet/></div>
        </section>
    )
}
export default Layout