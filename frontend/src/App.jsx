import { Routes, Route } from "react-router-dom";
import Navbar   from "./components/Navbar";
import Home     from "./pages/Home";
import Recipes  from "./pages/Recipes";
import About    from "./pages/About";

function App() {
  return (
    <div className="bg-[#0f172a] min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/about"   element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
