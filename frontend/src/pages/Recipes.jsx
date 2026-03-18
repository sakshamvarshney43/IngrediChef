import { useState, useEffect } from "react";
import { fetchCustomRecipes, deleteCustomRecipe, addCustomRecipe } from "../Api/recipeApi";
import RecipeCard from "../components/RecipeCard";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";

const EMPTY = {
  title: "", cuisine: "", course: "", diet: "Vegetarian",
  servings: "", time: "", ingredients: "", steps: "",
  youtube: "", url: "",
};

export default function Recipes() {
  const [recipes,    setRecipes]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [form,       setForm]       = useState(EMPTY);
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState("");

  const load = async () => {
    setLoading(true);
    try { setRecipes(await fetchCustomRecipes()); }
    catch { setRecipes([]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Title is required"); return; }
    setSaving(true); setError("");
    try {
      const payload = {
        ...form,
        time: parseInt(form.time) || 0,
        ingredients: form.ingredients.split(",").map(s => s.trim()).filter(Boolean),
        steps: form.steps.split("\n").map((s, i) => `${i + 1}. ${s.trim()}`).filter(s => s.length > 3),
      };
      await addCustomRecipe(payload);
      setForm(EMPTY);
      setShowForm(false);
      load();
    } catch (e) {
      setError(e.response?.data?.error || "Failed to save");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    try { await deleteCustomRecipe(id); load(); }
    catch { alert("Delete failed"); }
  };

  const INPUT = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500 transition";
  const LABEL = "block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider";

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-1">Recipe Library</h1>
          <p className="text-gray-400 text-sm">Browse and manage your custom saved recipes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
        >
          {showForm ? <><FaTimes size={12}/> Cancel</> : <><FaPlus size={12}/> Add Recipe</>}
        </button>
      </div>

      {/* Add Recipe Form */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10 text-white">
          <h2 className="text-xl font-bold mb-6 text-orange-400">Add New Recipe</h2>
          {error && <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className={LABEL}>Recipe Name *</label>
              <input name="title" value={form.title} onChange={handleChange}
                placeholder="e.g. Spicy Butter Chicken" className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Cuisine</label>
              <input name="cuisine" value={form.cuisine} onChange={handleChange}
                placeholder="e.g. Indian, Italian" className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Course</label>
              <select name="course" value={form.course} onChange={handleChange}
                className={INPUT + " cursor-pointer"}>
                <option value="">Select course</option>
                {["Main Course","Side Dish","Dessert","Snack","Breakfast","Lunch","Dinner"].map(c =>
                  <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Diet</label>
              <select name="diet" value={form.diet} onChange={handleChange}
                className={INPUT + " cursor-pointer"}>
                {["Vegetarian","Non Vegeterian","Vegan"].map(d =>
                  <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Servings</label>
              <input name="servings" value={form.servings} onChange={handleChange}
                placeholder="e.g. 4" className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Cook Time (minutes)</label>
              <input name="time" type="number" value={form.time} onChange={handleChange}
                placeholder="e.g. 30" className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>YouTube Link</label>
              <input name="youtube" value={form.youtube} onChange={handleChange}
                placeholder="https://youtube.com/..." className={INPUT} />
            </div>
            <div className="md:col-span-2">
              <label className={LABEL}>Recipe URL</label>
              <input name="url" value={form.url} onChange={handleChange}
                placeholder="https://..." className={INPUT} />
            </div>
            <div className="md:col-span-2">
              <label className={LABEL}>Ingredients (comma-separated)</label>
              <input name="ingredients" value={form.ingredients} onChange={handleChange}
                placeholder="tomato, garlic, olive oil, pasta" className={INPUT} />
            </div>
            <div className="md:col-span-2">
              <label className={LABEL}>Steps (one per line)</label>
              <textarea name="steps" value={form.steps} onChange={handleChange} rows={5}
                placeholder={"Boil water and salt generously\nAdd pasta and cook for 10 mins\nMix sauce and serve hot"}
                className={INPUT + " resize-none"} />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={handleSave} disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-50">
              {saving ? "Saving…" : "Save Recipe"}
            </button>
            <button onClick={() => { setShowForm(false); setForm(EMPTY); setError(""); }}
              className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-xl text-sm transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Recipes List */}
      {loading ? (
        <div className="text-center text-gray-400 py-20">Loading your recipes…</div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-white text-xl font-semibold mb-2">No custom recipes yet</p>
          <p className="text-gray-400 text-sm">Click "Add Recipe" above to save your own recipes here.</p>
        </div>
      ) : (
        <>
          <p className="text-gray-400 text-sm mb-6">{recipes.length} saved recipe{recipes.length !== 1 ? "s" : ""}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <div key={r._id} className="relative group">
                <RecipeCard recipe={{ ...r, isCustom: true }} addToGrocery={() => {}} userIngredients={[]} />
                <button
                  onClick={() => handleDelete(r._id)}
                  className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition"
                  title="Delete recipe"
                >
                  <FaTrash size={11} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
