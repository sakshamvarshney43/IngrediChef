# 🍳 IngrediChef — AI Recipe Recommendation System

Find recipes from ingredients you already have, powered by KNN + TF-IDF machine learning.

---

## Project Structure

```
ingredichef/
├── ml-service/          ← Python FastAPI  (port 8000)
│   ├── app.py
│   ├── loader.py
│   ├── recommender.py
│   └── artifacts/
│       ├── recipes2.pkl
│       ├── tfidf_vectorizer2.pkl
│       └── knn_model2.pkl
│
├── backend/             ← Node.js Express (port 3000)
│   ├── server.js
│   ├── models/CustomRecipe.js
│   ├── controllers/recipeController.js
│   └── routes/recipeRoutes.js
│
└── frontend/            ← React + Vite    (port 5173)
    └── src/
        ├── pages/  Home.jsx | Recipes.jsx | About.jsx
        ├── components/
        └── Api/recipeApi.js
```

---

## Quick Start

### 1 · ML Service
```bash
cd ml-service
pip install fastapi uvicorn scikit-learn joblib pandas scipy
uvicorn app:app --reload --port 8000
```

### 2 · Backend
```bash
cd backend
npm install
npm run dev        # requires nodemon, or: node server.js
# MongoDB optional — custom recipes won't persist without it
```

### 3 · Frontend
```bash
cd frontend
npm install
npm run dev        # opens http://localhost:5173
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/recommend | Get recipe recommendations |
| GET | /api/suggest?q= | Ingredient autocomplete |
| GET | /api/custom | List all custom recipes |
| POST | /api/custom | Add a custom recipe |
| DELETE | /api/custom/:id | Delete a custom recipe |

---

## Features

- 🔍 Ingredient-based ML recipe search (KNN + TF-IDF)
- 💡 Real-time ingredient autocomplete
- 🏷️ Filter by diet / course / cook time / servings
- 🟡 Missing ingredient suggestions per recipe
- 🛒 Grocery list with checkboxes + print
- ➕ Add & manage custom recipes (saved to MongoDB)
- 📋 Numbered step-by-step cooking instructions
- 📺 YouTube + full recipe website links
- 🌐 Multi-page: Home · Recipes · About

---

## Team

| Name | Role |
|------|------|
| Saksham Varshney | ML Engineer |
| Suraj Kumar Gupta | Backend Developer |
| Singh Krishnaraj | Frontend Developer |
| Siddhartha Tiwari | Full Stack & Data |
