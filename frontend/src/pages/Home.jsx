import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RecipeGrid from "../components/RecipeGrid";
import { useState } from "react";

function Home() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="bg-[#0f172a] min-h-screen">
      <Navbar />

      <Hero setRecipes={setRecipes} />

      <RecipeGrid recipes={recipes} />
    </div>
  );
}

export default Home;
