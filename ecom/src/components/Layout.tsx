import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../app/hook";
import Loading from "./sub/Loading";

const Layout = () => {

    const status = useAppSelector(state => state.all.status)
    const error = useAppSelector(state => state.all.error)
    const isOpen = useAppSelector(state => state.all.isOpened)

    return (
      <section>
        {status === "loading" ? (
          <Loading />
        ) : status === "rejected" ? (
          <div>{error}</div>
        ) : (
          <div className="layout-section">
            <div className="layout-nav">
              <Nav />
            </div>
            <div className={`layout-sidebar ${isOpen? 'active' : ''}`}>
              <Sidebar />
            </div>
            <div className={`layout-outlet ${isOpen? 'disable' : ''}`}>
              <Outlet />
            </div>
          </div>
        )}
      </section>
    );
}
export default Layout