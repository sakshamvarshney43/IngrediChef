const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title:       { type: String, required: true },
  cuisine:     { type: String, default: "" },
  course:      { type: String, default: "" },
  diet:        { type: String, default: "Vegetarian" },
  servings:    { type: String, default: "" },
  time:        { type: Number, default: 0 },
  ingredients: [String],
  steps:       [String],
  youtube:     { type: String, default: "" },
  url:         { type: String, default: "" },
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model("CustomRecipe", schema);
