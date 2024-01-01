import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import All from "./components/All";
import Layout from "./components/Layout";
import View from "./components/View";
import Cart from "./components/Cart";
import Error from "./components/sub/Error";

function App() {
  return (
    <section>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<All/>}/>
          </Route>
          <Route path="/view" element={<View/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='*' element = {<Error/>} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
