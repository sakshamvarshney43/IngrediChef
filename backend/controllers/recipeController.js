const axios = require("axios");

const getRecipes = async (req, res) => {
  try {
    const ingredients = req.body.ingredients;

    const response = await axios.post("http://127.0.0.1:8000/recommend", {
      ingredients: ingredients,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ML service error" });
  }
};

module.exports = { getRecipes };
