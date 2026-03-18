import { useState } from "react";
import {
  FaClock, FaUsers, FaExternalLinkAlt, FaYoutube,
  FaPlus, FaMinus, FaShoppingCart, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import RecipeImage from "./RecipeImage";

const DIET_COLOR = {
  vegetarian:      "bg-green-500/20 text-green-400 border-green-500/30",
  vegan:           "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "nonvegeterian": "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function RecipeCard({ recipe, addToGrocery, userIngredients }) {
  const [showAll,  setShowAll]  = useState(false);
  const [expanded, setExpanded] = useState(false);

  const ings    = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const steps   = Array.isArray(recipe.steps)       ? recipe.steps       : [];
  const userSet = new Set((userIngredients || []).map(u => u.toLowerCase().trim()));
  const SHOW_N  = 5;
  const extra   = ings.length - SHOW_N;

  const dietKey   = (recipe.diet || "").toLowerCase().replace(/\s/g, "");
  const dietClass = DIET_COLOR[dietKey] || "bg-orange-500/20 text-orange-400 border-orange-500/30";
  const dietIcon  = dietKey.includes("nonveg") ? "🍗" : dietKey.includes("vegan") ? "🌱" : "🥗";

  const handleGrocery = () => {
    const missing = ings.filter(
      ing => !userSet.size || !Array.from(userSet).some(u => ing.toLowerCase().includes(u))
    );
    addToGrocery(missing.length ? missing : ings);
  };

  const hasUrl     = recipe.url     && recipe.url     !== "nan" && recipe.url.startsWith("http");
  const hasYoutube = recipe.youtube && recipe.youtube !== "nan" && recipe.youtube.startsWith("http");

  return (
    <div className="bg-[#1a2540] border border-white/10 rounded-2xl overflow-hidden text-white flex flex-col hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group">

      {/* ── Image ── */}
      <div className="relative">
        <RecipeImage
          recipeUrl={hasUrl ? recipe.url : null}
          course={recipe.course}
          title={recipe.title}
        />
        {/* Diet badge floated over the image */}
        {recipe.diet && (
          <span className={`absolute top-2.5 left-2.5 text-[10px] px-2 py-0.5 rounded-full border font-semibold backdrop-blur-sm ${dietClass}`}>
            {dietIcon} {recipe.diet}
          </span>
        )}
        {recipe.isCustom && (
          <span className="absolute top-2.5 right-2.5 text-[10px] bg-purple-500/70 text-white px-2 py-0.5 rounded-full border border-purple-400/50 font-semibold backdrop-blur-sm">
            Custom
          </span>
        )}
        {recipe.match_pct > 0 && (
          <span className="absolute bottom-2.5 right-2.5 text-[10px] bg-black/60 text-green-300 px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm">
            ✓ {recipe.match_pct}% match
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-4 flex flex-col flex-1">

        {/* Title */}
        <h2 className="text-sm font-bold leading-snug mb-2 group-hover:text-orange-300 transition line-clamp-2">
          {recipe.title}
        </h2>

        {/* Course + Cuisine tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {recipe.course && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium">
              {recipe.course}
            </span>
          )}
          {recipe.cuisine && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/15 font-medium">
              {recipe.cuisine}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-xs text-gray-400 mb-3">
          {recipe.time > 0 && (
            <span className="flex items-center gap-1">
              <FaClock size={10} className="text-orange-400" /> {recipe.time} min
            </span>
          )}
          {recipe.servings && (
            <span className="flex items-center gap-1">
              <FaUsers size={10} className="text-orange-400" /> {recipe.servings} servings
            </span>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-3">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Ingredients</p>
          <div className="flex flex-wrap gap-1.5">
            {(showAll ? ings : ings.slice(0, SHOW_N)).map((ing, i) => {
              const owned = userSet.size > 0 && Array.from(userSet).some(u => ing.toLowerCase().includes(u));
              return (
                <span key={i}
                  className={`text-[11px] px-2 py-0.5 rounded-md capitalize transition ${
                    owned
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-white/8 text-gray-300 border border-white/10"
                  }`}>
                  {ing}
                </span>
              );
            })}
            {ings.length > SHOW_N && (
              <button
                onClick={() => setShowAll(s => !s)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/30 flex items-center gap-1 hover:bg-orange-500/35 transition"
              >
                {showAll ? <><FaMinus size={7} /> less</> : <><FaPlus size={7} /> {extra} more</>}
              </button>
            )}
          </div>
        </div>

        {/* Missing ingredients */}
        {recipe.missing?.length > 0 && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-[10px] text-yellow-400 font-semibold mb-1 uppercase tracking-wider">You might need</p>
            <div className="flex flex-wrap gap-1">
              {recipe.missing.map((m, i) => (
                <span key={i} className="text-[11px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300 capitalize">{m}</span>
              ))}
            </div>
          </div>
        )}

        {/* Steps accordion */}
        {steps.length > 0 && (
          <div className="mb-3">
            <button
              onClick={() => setExpanded(e => !e)}
              className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-white py-2 border-t border-white/10 transition"
            >
              <span className="font-medium">{expanded ? "Hide" : "Show"} Steps ({steps.length})</span>
              {expanded ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
            </button>
            {expanded && (
              <ol className="text-xs text-gray-300 space-y-2 mt-1 max-h-48 overflow-y-auto pr-1">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="text-orange-400 font-bold shrink-0 w-5 text-right">{i + 1}.</span>
                    <span>{step.replace(/^\d+\.\s*/, "")}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

        {/* Action buttons — pushed to bottom */}
        <div className="mt-auto pt-3 flex gap-2">
          {hasUrl && (
            <a href={recipe.url} target="_blank" rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-xl text-xs font-semibold transition">
              <FaExternalLinkAlt size={9} /> Open Full Recipe
            </a>
          )}
          {hasYoutube && (
            <a href={recipe.youtube} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-xl text-xs font-semibold transition">
              <FaYoutube size={12} /> Watch
            </a>
          )}
          {addToGrocery && (
            <button onClick={handleGrocery}
              title="Add missing ingredients to grocery list"
              className="flex items-center justify-center bg-green-600/80 hover:bg-green-600 px-3 py-2 rounded-xl text-xs font-semibold transition">
              <FaShoppingCart size={11} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
