import { NavLink } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-orange-400 font-semibold"
      : "text-gray-300 hover:text-orange-400 transition";

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black/50 backdrop-blur-lg text-white fixed w-full z-50 border-b border-white/10">
      <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-white">
        <FaUtensils className="text-orange-400" />
        IngrediChef
      </NavLink>
      <div className="flex gap-7 text-sm font-medium">
        <NavLink to="/"        className={linkClass}>Home</NavLink>
        <NavLink to="/recipes" className={linkClass}>Recipes</NavLink>
        <NavLink to="/about"   className={linkClass}>About</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
