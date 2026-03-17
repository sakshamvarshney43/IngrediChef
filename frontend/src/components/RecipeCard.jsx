function RecipeCard({ recipe }) {
  return (
    <div className="bg-[#1e293b] text-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2 capitalize">{recipe.title}</h2>

      <p className="text-gray-400 mb-3">⏱ {recipe.minutes} minutes</p>

      <div className="mb-3">
        <p className="font-semibold">Ingredients:</p>

        <ul className="list-disc list-inside text-sm text-gray-300">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-semibold">Instructions:</p>

        <ol className="list-decimal list-inside text-sm text-gray-300">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecipeCard;
