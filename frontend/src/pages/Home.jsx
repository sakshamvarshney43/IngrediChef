import { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaTimes, FaPlus, FaShoppingCart } from "react-icons/fa";
import { fetchRecommendations, fetchSuggestions } from "../Api/recipeApi";
import RecipeGrid from "../components/RecipeGrid";
import FilterBar  from "../components/FilterBar";
import GroceryModal from "../components/GroceryModal";

function Home() {
  const [input,        setInput]        = useState("");
  const [ingredients,  setIngredients]  = useState([]);
  const [suggestions,  setSuggestions]  = useState([]);
  const [allRecipes,   setAllRecipes]   = useState([]);
  const [recipes,      setRecipes]      = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [filters,      setFilters]      = useState({ diet:"", course:"", maxTime:"", servings:"" });
  const [grocery,      setGrocery]      = useState([]);
  const [showGrocery,  setShowGrocery]  = useState(false);
  const [searched,     setSearched]     = useState(false);
  const sugRef = useRef(null);

  /* Autocomplete */
  useEffect(() => {
    if (input.trim().length < 2) { setSuggestions([]); return; }
    const t = setTimeout(async () => {
      try {
        const s = await fetchSuggestions(input.trim());
        setSuggestions(s || []);
      } catch { setSuggestions([]); }
    }, 250);
    return () => clearTimeout(t);
  }, [input]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => { if (sugRef.current && !sugRef.current.contains(e.target)) setSuggestions([]); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Apply filters whenever allRecipes or filters change */
  useEffect(() => {
    let r = [...allRecipes];
    if (filters.diet)     r = r.filter(rc => rc.diet?.toLowerCase().includes(filters.diet.toLowerCase()));
    if (filters.course)   r = r.filter(rc => rc.course?.toLowerCase().includes(filters.course.toLowerCase()));
    if (filters.maxTime)  r = r.filter(rc => rc.time <= parseInt(filters.maxTime));
    if (filters.servings) r = r.filter(rc => String(rc.servings) === filters.servings);
    setRecipes(r);
  }, [allRecipes, filters]);

  const addIngredient = useCallback((val) => {
    const v = (val || input).trim();
    if (!v || ingredients.includes(v)) return;
    setIngredients(prev => [...prev, v]);
    setInput("");
    setSuggestions([]);
  }, [input, ingredients]);

  const removeIngredient = (i) => setIngredients(prev => prev.filter((_, idx) => idx !== i));

  const handleSearch = async () => {
    if (!ingredients.length) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await fetchRecommendations(ingredients, 12);
      setAllRecipes(data || []);
    } catch {
      setAllRecipes([]);
    }
    setLoading(false);
  };

  const addToGrocery = (items) => {
    setGrocery(prev => {
      const merged = [...new Set([...prev, ...items])];
      return merged;
    });
  };

  return (
    <>
      {/* HERO */}
      <div
        className="min-h-screen flex items-center justify-center text-white px-6 pt-16"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/65 backdrop-blur-md p-10 rounded-3xl text-center max-w-2xl w-full shadow-2xl">
          <h1 className="text-5xl font-extrabold mb-2 tracking-tight">IngrediChef 🍳</h1>
          <p className="text-gray-300 mb-8 text-lg">Type your ingredients — discover perfect recipes instantly</p>

          {/* Input + autocomplete */}
          <div className="relative flex justify-center gap-2 mb-4" ref={sugRef}>
            <div className="relative w-64">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addIngredient()}
                placeholder="e.g. tomato, garlic…"
                className="px-4 py-2.5 rounded-xl text-black w-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {suggestions.length > 0 && (
                <ul className="absolute left-0 top-full mt-1 w-full bg-white rounded-xl shadow-xl z-50 text-left overflow-hidden">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      onMouseDown={() => addIngredient(s)}
                      className="px-4 py-2 text-sm text-gray-800 hover:bg-orange-100 cursor-pointer capitalize"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => addIngredient()}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1 transition"
            >
              <FaPlus size={12} /> Add
            </button>
          </div>

          {/* Chips */}
          {ingredients.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {ingredients.map((item, i) => (
                <span key={i} className="bg-orange-500 px-3 py-1 text-sm rounded-full flex items-center gap-2">
                  {item}
                  <button onClick={() => removeIngredient(i)} className="hover:text-white/70">
                    <FaTimes size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleSearch}
              disabled={loading || !ingredients.length}
              className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
              ) : (
                <FaSearch />
              )}
              {loading ? "Searching…" : "Find Recipes"}
            </button>

            {grocery.length > 0 && (
              <button
                onClick={() => setShowGrocery(true)}
                className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                <FaShoppingCart /> {grocery.length}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      {searched && (
        <div className="max-w-7xl mx-auto px-6 pb-16">
          {allRecipes.length > 0 && (
            <FilterBar filters={filters} setFilters={setFilters} recipes={allRecipes} />
          )}
          {loading ? (
            <div className="text-center text-gray-400 py-20 text-lg">Loading recipes…</div>
          ) : recipes.length > 0 ? (
            <RecipeGrid recipes={recipes} addToGrocery={addToGrocery} userIngredients={ingredients} />
          ) : (
            <div className="text-center text-gray-400 py-20">
              <p className="text-xl">No recipes found.</p>
              <p className="text-sm mt-2">Try adding more or different ingredients.</p>
            </div>
          )}
        </div>
      )}

      {showGrocery && (
        <GroceryModal list={grocery} setList={setGrocery} onClose={() => setShowGrocery(false)} />
      )}
    </>
  );
}

export default Home;
