import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {  Routes, HashRouter, Route, Navigate } from "react-router-dom";
import All from "./components/All";
import Layout from "./components/Layout";
import View from "./components/View";
import Cart from "./components/Cart";
import Error from "./components/sub/Error";
import Bank from "./components/Bank";

function App() {
  return (
    <section>
      <HashRouter>
        <ToastContainer />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/nakul" element={<All />} />
            <Route path="/" element={<Navigate to="/nakul" />} />
          </Route>
          <Route path="/view" element={<View />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
          <Route path="/bank" element={<Bank />} />
        </Routes>
      </HashRouter>
    </section>
  );
}

export default App;
