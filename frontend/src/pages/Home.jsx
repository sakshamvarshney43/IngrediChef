import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecipeGrid from "../components/RecipeGrid";

function Home() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div>
      <Navbar />

      <Hero setRecipes={setRecipes} />

      <RecipeGrid recipes={recipes} />
    </div>
  );
}

export default Home;
