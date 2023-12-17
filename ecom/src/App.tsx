import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar"
import All from "./components/All";
import Layout from "./components/Layout";
import NotFound from "./components/sub/NotFound";

function App() {
  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<All/>}/>
            <Route path="/notFound" element={<NotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
