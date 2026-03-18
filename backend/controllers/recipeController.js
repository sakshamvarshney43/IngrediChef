const axios        = require("axios");
const CustomRecipe = require("../models/CustomRecipe");

const ML_URL = process.env.ML_URL || "http://127.0.0.1:8000";

/* ─── Recommend (ML + custom merge) ─── */
async function recommend(req, res) {
  try {
    const { ingredients, n = 10 } = req.body;
    if (!ingredients || !ingredients.length)
      return res.status(400).json({ error: "ingredients required" });

    // Call ML service
    const mlRes = await axios.post(`${ML_URL}/recommend`, { ingredients, n });
    let recipes = mlRes.data.recipes || [];

    // Append matching custom recipes from MongoDB (if connected)
    try {
      const customs = await CustomRecipe.find({});
      const userSet = new Set(ingredients.map((i) => i.toLowerCase().trim()));
      const matched = customs.filter((c) =>
        c.ingredients.some((ing) =>
          [...userSet].some((u) => ing.toLowerCase().includes(u))
        )
      );
      matched.forEach((c) => {
        recipes.push({
          title:      c.title,
          cuisine:    c.cuisine,
          course:     c.course,
          diet:       c.diet,
          servings:   c.servings,
          time:       c.time,
          ingredients: c.ingredients,
          steps:      c.steps,
          youtube:    c.youtube,
          url:        c.url,
          match_pct:  0,
          missing:    [],
          isCustom:   true,
        });
      });
    } catch (_) { /* MongoDB offline – skip custom recipes */ }

    return res.json({ recipes });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "ML service error" });
  }
}

/* ─── Ingredient autocomplete ─── */
async function suggest(req, res) {
  try {
    const { q } = req.query;
    const mlRes = await axios.get(`${ML_URL}/suggest`, { params: { q } });
    return res.json(mlRes.data);
  } catch (err) {
    return res.status(500).json({ suggestions: [] });
  }
}

/* ─── Get all custom recipes ─── */
async function getCustom(req, res) {
  try {
    const recipes = await CustomRecipe.find().sort({ createdAt: -1 });
    return res.json({ recipes });
  } catch (err) {
    return res.status(500).json({ error: "DB error" });
  }
}

/* ─── Add custom recipe ─── */
async function addCustom(req, res) {
  try {
    const recipe = new CustomRecipe(req.body);
    await recipe.save();
    return res.status(201).json({ recipe });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

/* ─── Delete custom recipe ─── */
async function deleteCustom(req, res) {
  try {
    await CustomRecipe.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

module.exports = { recommend, suggest, getCustom, addCustom, deleteCustom };
