import { useState } from "react";
import axios from "axios";

function IngredientInput() {
  const [ingredients, setIngredients] = useState("");

  const handleSearch = async () => {
    const res = await axios.post("http://localhost:5000/recommend", {
      ingredients: ingredients,
    });

    console.log(res.data);
  };

  return (
    <div className="flex gap-3">
      <input
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="tomato, onion, cheese..."
        className="px-4 py-3 rounded-xl text-black w-72"
      />

      <button
        onClick={handleSearch}
        className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-semibold"
      >
        Find Recipes
      </button>
    </div>
  );
}

export default IngredientInput;
