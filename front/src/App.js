import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Area from "./components/Area";
import Theme from "./components/Theme";
import Hot from "./components/Hot";
import Visited from "./components/Visited";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/area" element={<Area />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/hot" element={<Hot />} />
          <Route path="/visited" element={<Visited />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
