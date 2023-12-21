import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar"
import All from "./components/All";
import Layout from "./components/Layout";
import NotFound from "./components/sub/NotFound";
import View from "./components/View";

function App() {
  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<All/>}/>
            <Route path="/notFound" element={<NotFound/>}/>
          </Route>
          <Route path="/view" element={<View/>}/>
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
