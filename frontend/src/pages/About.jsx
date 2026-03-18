import { FaGithub, FaUtensils, FaBrain, FaCode, FaDatabase, FaRocket } from "react-icons/fa";

const TEAM = [
  { name: "Saksham Varshney",   role: "ML Engineer",       emoji: "🧠", color: "from-purple-500 to-indigo-600" },
  { name: "Suraj Kumar Gupta",  role: "Backend Developer",  emoji: "⚙️",  color: "from-blue-500 to-cyan-600"   },
  { name: "Singh Krishnaraj",   role: "Frontend Developer", emoji: "🎨", color: "from-orange-500 to-red-600"   },
  { name: "Siddhartha Tiwari",  role: "Full Stack & Data",  emoji: "🚀", color: "from-green-500 to-teal-600"   },
];

const TECH = [
  { icon: <FaBrain />,    label: "Machine Learning",  desc: "KNN + TF-IDF vectorization on 5,000+ Indian recipes", color: "text-purple-400" },
  { icon: <FaCode />,     label: "React + Vite",      desc: "Fast, modern frontend with Tailwind CSS",              color: "text-blue-400"   },
  { icon: <FaDatabase />, label: "Node.js + MongoDB",  desc: "RESTful backend with custom recipe persistence",      color: "text-green-400"  },
  { icon: <FaRocket />,   label: "FastAPI",            desc: "Python ML service with real-time recommendations",    color: "text-orange-400" },
];

const FEATURES = [
  { emoji: "🔍", title: "Smart Search",        desc: "Type any ingredients you have — our ML model finds the best matching recipes instantly." },
  { emoji: "💡", title: "Autocomplete",         desc: "Start typing an ingredient and get instant smart suggestions from our recipe database." },
  { emoji: "🥗", title: "Diet Filters",         desc: "Filter by Vegetarian, Non-Vegetarian, or Vegan. Also filter by course, cook time, and servings." },
  { emoji: "🟡", title: "Missing Ingredients",  desc: "Each card shows you exactly which ingredients you're missing so you can shop smart." },
  { emoji: "🛒", title: "Grocery List",         desc: "Add missing ingredients from any recipe to your grocery list with one click. Print or save it." },
  { emoji: "➕", title: "Custom Recipes",       desc: "Add your own recipes to the database. They appear in search results and your personal library." },
  { emoji: "📺", title: "Video Links",          desc: "Cards link directly to YouTube tutorials and full recipe websites." },
  { emoji: "📋", title: "Step-by-Step",         desc: "Every recipe shows numbered cooking steps in a clean, readable accordion." },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-20 text-white">

      {/* Hero Banner */}
      <div
        className="relative flex items-center justify-center text-center px-6 py-28 mb-16"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex justify-center mb-4">
            <span className="bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
              About the Project
            </span>
          </div>
          <h1 className="text-6xl font-black mb-5 tracking-tight">
            Ingr<span className="text-orange-400">edi</span>Chef
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            An AI-powered recipe recommendation system that turns whatever ingredients you have at home into delicious meal ideas — instantly, intelligently, and beautifully.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* What is it */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-center">What is IngrediChef?</h2>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-gray-300 leading-relaxed text-base space-y-4 max-w-3xl mx-auto text-center">
            <p>
              IngrediChef is a full-stack AI recipe recommendation engine. You tell it what ingredients you have — it tells you what to cook.
            </p>
            <p>
              Under the hood, our ML service uses <span className="text-orange-300 font-semibold">TF-IDF vectorization</span> and a <span className="text-orange-300 font-semibold">K-Nearest Neighbours model</span> trained on thousands of Indian recipes. It matches your ingredient list to the closest recipes in vector space in milliseconds.
            </p>
            <p>
              The system also shows you what ingredients you're missing, lets you build a grocery list, filter by diet and cook time, and save your own custom recipes to the library.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-orange-500/30 hover:bg-white/8 transition-all group">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-white mb-2 group-hover:text-orange-300 transition">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Tech Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TECH.map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-white/20 transition">
                <div className={`text-3xl mb-3 ${t.color}`}>{t.icon}</div>
                <h3 className="font-bold text-white mb-2">{t.label}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-0 max-w-4xl mx-auto">
            {[
              { step:"1", title:"Add Ingredients",   desc:"Type what's in your fridge or pantry. Use autocomplete to find exact ingredient names.",   color:"bg-orange-500" },
              { step:"2", title:"ML Matching",        desc:"FastAPI sends your ingredients through TF-IDF + KNN to find the nearest recipe vectors.",   color:"bg-red-500"    },
              { step:"3", title:"Results & Filters",  desc:"Browse matched recipes. Filter by diet, time, course. See match % and missing ingredients.", color:"bg-purple-500" },
              { step:"4", title:"Cook & Shop",        desc:"Open the full recipe or watch on YouTube. Add missing items to your grocery list.",          color:"bg-green-500"  },
            ].map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center px-4 pb-8 md:pb-0 relative">
                <div className={`w-12 h-12 ${s.color} rounded-full flex items-center justify-center text-white font-black text-lg mb-4 z-10`}>
                  {s.step}
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-0 h-px bg-white/10" />
                )}
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold mb-3 text-center">Meet the Team</h2>
          <p className="text-gray-400 text-center text-sm mb-10">The minds behind IngrediChef</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {TEAM.map((m, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-10 group-hover:opacity-20 transition`} />
                <div className="relative z-10 p-6 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                    {m.emoji}
                  </div>
                  <h3 className="font-bold text-white text-sm leading-snug mb-1">{m.name}</h3>
                  <p className="text-gray-400 text-xs">{m.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-gray-500 text-xs">
              Built with ❤️ as an academic project · IngrediChef © 2025
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
