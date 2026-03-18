import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Hero({ setRecipes }) {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("");

  const addIngredient = () => {
    if (input.trim() === "") return;

    setIngredients([...ingredients, input.trim()]);
    setInput("");
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addIngredient();
    }
  };

  const handleSearch = () => {
    const demoRecipes = [
      {
        name: "Tomato Pasta",
        minutes: 20,
        ingredients: ["tomato", "pasta", "garlic"],
      },
      {
        name: "Veggie Pizza",
        minutes: 35,
        ingredients: ["cheese", "tomato", "flour"],
      },
      {
        name: "Fresh Salad",
        minutes: 10,
        ingredients: ["lettuce", "tomato", "cucumber"],
      },
    ];

    setRecipes(demoRecipes);
  };

  return (
    <div
      className="min-h-[70vh] flex items-center justify-center text-white px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1490818387583-1baba5e638af')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/60 backdrop-blur-md p-10 rounded-3xl text-center max-w-2xl w-full">
        <h1 className="text-5xl font-bold mb-4">IngrediChef 🍳</h1>

        <p className="text-gray-300 mb-6">
          Add ingredients and discover recipes instantly
        </p>

        {/* INPUT + ADD BUTTON */}
        <div className="flex justify-center gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="add ingredient..."
            className="px-3 py-2 rounded-lg text-black w-52 text-sm"
          />

          <button
            onClick={addIngredient}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Add
          </button>
        </div>

        {/* INGREDIENT CHIPS */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="bg-orange-500/90 px-3 py-1 text-sm rounded-full flex items-center gap-2"
            >
              {item}

              <button
                onClick={() => removeIngredient(index)}
                className="text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto hover:scale-105 transition"
        >
          <FaSearch />
          Find Recipes
        </button>
      </div>
    </div>
  );
}

export default Hero;
