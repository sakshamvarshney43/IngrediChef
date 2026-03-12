function RecipeCard({ recipe }) {
  const ingredients =
    typeof recipe.ingredients === "string"
      ? recipe.ingredients.split(",")
      : recipe.ingredients || [];

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white hover:scale-105 transition">
      <h2 className="text-xl font-bold mb-3">{recipe.name}</h2>

      <p className="text-gray-300 text-sm mb-3">
        Cooking Time: {recipe.minutes || "N/A"} minutes
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {ingredients.slice(0, 5).map((item, index) => (
          <span
            key={index}
            className="bg-orange-500/30 px-2 py-1 rounded text-xs"
          >
            {item}
          </span>
        ))}
      </div>

      <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold">
        View Recipe
      </button>
    </div>
  );
}

export default RecipeCard;
