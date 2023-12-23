import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar"
import All from "./components/All";
import Layout from "./components/Layout";
import NotFound from "./components/sub/NotFound";
import View from "./components/View";
import Cart from "./components/Cart";

function App() {
  return (
    <section>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<All/>}/>
            <Route path="/notFound" element={<NotFound/>}/>
          </Route>
          <Route path="/view" element={<View/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
