import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

export const fetchRecommendations = (ingredients, n = 10) =>
  API.post("/recommend", { ingredients, n }).then((r) => r.data.recipes);

export const fetchSuggestions = (q) =>
  API.get("/suggest", { params: { q } }).then((r) => r.data.suggestions);

export const fetchOgImage = (url) =>
  API.get("/og-image", { params: { url } }).then((r) => r.data.image);

export const fetchCustomRecipes = () =>
  API.get("/custom").then((r) => r.data.recipes);

export const addCustomRecipe = (recipe) =>
  API.post("/custom", recipe).then((r) => r.data.recipe);

export const deleteCustomRecipe = (id) =>
  API.delete(`/custom/${id}`);
