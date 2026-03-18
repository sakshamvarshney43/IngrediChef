import { useState } from "react";
import { FaTimes, FaTrash, FaPrint, FaCheck } from "react-icons/fa";

export default function GroceryModal({ list, setList, onClose }) {
  const [checked, setChecked] = useState(new Set());

  const toggle = (item) => {
    setChecked(prev => {
      const n = new Set(prev);
      n.has(item) ? n.delete(item) : n.add(item);
      return n;
    });
  };

  const remove = (item) => setList(prev => prev.filter(i => i !== item));

  const clearDone = () => {
    setList(prev => prev.filter(i => !checked.has(i)));
    setChecked(new Set());
  };

  const print = () => {
    const content = list.map((i, idx) => `${idx + 1}. ${i}`).join("\n");
    const win = window.open("", "_blank");
    win.document.write(`<pre style="font-family:sans-serif;font-size:16px;padding:24px;">
🛒 Grocery List\n\n${content}
</pre>`);
    win.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter:"blur(6px)" }}>
      <div className="bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-md text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="font-bold text-lg flex items-center gap-2">🛒 Grocery List <span className="text-orange-400 text-sm">({list.length})</span></h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><FaTimes /></button>
        </div>

        {/* List */}
        <ul className="px-6 py-4 max-h-80 overflow-y-auto space-y-2">
          {list.length === 0 && <li className="text-gray-400 text-sm text-center py-4">Your list is empty</li>}
          {list.map((item, i) => (
            <li key={i} className={`flex items-center gap-3 py-2 border-b border-white/5 last:border-0 ${checked.has(item) ? "opacity-40" : ""}`}>
              <button
                onClick={() => toggle(item)}
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition ${checked.has(item) ? "bg-green-500 border-green-500" : "border-white/30 hover:border-green-400"}`}
              >
                {checked.has(item) && <FaCheck size={10} />}
              </button>
              <span className={`flex-1 text-sm capitalize ${checked.has(item) ? "line-through" : ""}`}>{item}</span>
              <button onClick={() => remove(item)} className="text-gray-500 hover:text-red-400 transition"><FaTrash size={11} /></button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex gap-3">
          {checked.size > 0 && (
            <button onClick={clearDone} className="flex-1 bg-white/10 hover:bg-white/20 text-sm py-2 rounded-xl transition">
              Remove done ({checked.size})
            </button>
          )}
          <button
            onClick={print}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-sm py-2 rounded-xl flex items-center justify-center gap-2 transition font-semibold"
          >
            <FaPrint size={12} /> Print / Save
          </button>
        </div>
      </div>
    </div>
  );
}
