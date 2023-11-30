import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <section>
      <BrowserRouter>
        <Nav />
        <Sidebar/>
        <Routes>
          <Route />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
