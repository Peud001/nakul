import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <section>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
