import { FaUtensils } from "react-icons/fa";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-black/40 backdrop-blur-lg text-white fixed w-full z-50">
      <div className="flex items-center gap-2 text-xl font-bold">
        <FaUtensils className="text-orange-400" />
        IngrediChef
      </div>

      <div className="flex gap-6 text-gray-300">
        <button className="hover:text-orange-400">Home</button>
        <button className="hover:text-orange-400">Recipes</button>
        <button className="hover:text-orange-400">About</button>
      </div>
    </div>
  );
}

export default Navbar;
