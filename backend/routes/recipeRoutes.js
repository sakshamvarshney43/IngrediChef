const express = require("express");
const router = express.Router();

const { getRecipes } = require("../controllers/recipeController");

router.post("/recommend", getRecipes);

module.exports = router;
