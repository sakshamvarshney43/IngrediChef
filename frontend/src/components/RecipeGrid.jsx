import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes, addToGrocery, userIngredients }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, i) => (
        <RecipeCard
          key={i}
          recipe={recipe}
          addToGrocery={addToGrocery}
          userIngredients={userIngredients}
        />
      ))}
    </div>
  );
}
