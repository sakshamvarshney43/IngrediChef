import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-16 px-6">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeGrid;
