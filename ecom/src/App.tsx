import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar"
import All from "./components/All";
import Layout from "./components/Layout";

function App() {
  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<All/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
