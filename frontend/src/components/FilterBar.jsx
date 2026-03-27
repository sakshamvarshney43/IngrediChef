import { FaFilter, FaTimes } from "react-icons/fa";
import { useState } from "react";

const DIETS    = ["Vegetarian", "Non Vegetarian", "Vegan"];
const COURSES  = ["Main Course", "Side Dish", "Dessert", "Snack", "Breakfast", "Lunch", "Dinner"];
const TIMES    = [{ label: "≤ 15 min", val: "15" }, { label: "≤ 30 min", val: "30" }, { label: "≤ 60 min", val: "60" }, { label: "≤ 90 min", val: "90" }];
const SERVINGS = ["1", "2", "3", "4", "5", "6"];

export default function FilterBar({ filters, setFilters, recipes }) {
  const [open, setOpen] = useState(false);

  const set = (k, v) => setFilters(f => ({ ...f, [k]: f[k] === v ? "" : v }));
  const clearAll = () => setFilters({ diet:"", course:"", maxTime:"", servings:"" });
  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition border border-white/20"
        >
          <FaFilter size={12} />
          Filters
          {activeCount > 0 && (
            <span className="bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">{activeCount}</span>
          )}
        </button>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition">
            <FaTimes size={11} /> Clear filters
          </button>
        )}
        <span className="text-sm text-gray-400">{recipes.length} recipes found</span>
      </div>

      {open && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Diet */}
          <div>
            <p className="text-xs text-orange-400 font-semibold uppercase mb-2 tracking-wider">Diet</p>
            <div className="flex flex-col gap-1.5">
              {DIETS.map(d => (
                <button key={d} onClick={() => set("diet", d)}
                  className={`text-left text-sm px-3 py-1.5 rounded-lg transition ${filters.diet === d ? "bg-orange-500 text-white" : "bg-white/5 hover:bg-white/15 text-gray-300"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Course */}
          <div>
            <p className="text-xs text-orange-400 font-semibold uppercase mb-2 tracking-wider">Course</p>
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
              {COURSES.map(c => (
                <button key={c} onClick={() => set("course", c)}
                  className={`text-left text-sm px-3 py-1.5 rounded-lg transition ${filters.course === c ? "bg-orange-500 text-white" : "bg-white/5 hover:bg-white/15 text-gray-300"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div>
            <p className="text-xs text-orange-400 font-semibold uppercase mb-2 tracking-wider">Cook Time</p>
            <div className="flex flex-col gap-1.5">
              {TIMES.map(t => (
                <button key={t.val} onClick={() => set("maxTime", t.val)}
                  className={`text-left text-sm px-3 py-1.5 rounded-lg transition ${filters.maxTime === t.val ? "bg-orange-500 text-white" : "bg-white/5 hover:bg-white/15 text-gray-300"}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Servings */}
          <div>
            <p className="text-xs text-orange-400 font-semibold uppercase mb-2 tracking-wider">Servings</p>
            <div className="grid grid-cols-3 gap-1.5">
              {SERVINGS.map(s => (
                <button key={s} onClick={() => set("servings", s)}
                  className={`text-sm px-2 py-1.5 rounded-lg transition text-center ${filters.servings === s ? "bg-orange-500 text-white" : "bg-white/5 hover:bg-white/15 text-gray-300"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
