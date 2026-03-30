<div align="center">

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white"/>

# 🍳 IngrediChef

### *Type your ingredients — discover perfect recipes instantly*

**IngrediChef** is a full-stack AI-powered recipe recommendation system that uses **TF-IDF vectorization** and **K-Nearest Neighbors** to intelligently match the ingredients you have at home with the best possible recipes.

No more staring into the fridge wondering what to cook. Just type what you have — IngrediChef does the rest.

</div>

---

## 📸 Screenshots

### 🏠 Home — Ingredient Search
![Home Page](screenshot_home.jpeg)

### 🍽️ Recipe Results with Match Scores
![Recipe Results](screenshot_results.jpeg)

### 📚 Recipe Library
![Recipe Library](screenshot_library.jpeg)

---

## 🎬 Demo Video

> 📁 Place your demo video at `videos/demo.mp4`

[![Watch Demo](https://img.shields.io/badge/▶%20Watch%20Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://your-video-link.com)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 ML-Powered Search | TF-IDF + KNN matches ingredients to recipes intelligently |
| 💡 Autocomplete | Real-time ingredient suggestions as you type |
| 🏷️ Smart Filters | Filter by diet (veg/non-veg), course, cook time, servings |
| 🟡 Missing Ingredients | See exactly what you're short on for each recipe |
| 🛒 Grocery List | Checkbox-based shopping list with print support |
| ➕ Custom Recipes | Add, manage, and persist your own recipes |
| 📋 Cooking Steps | Step-by-step instructions expandable per recipe |
| 📺 External Links | YouTube & full recipe source links built-in |
| 🌐 Multi-page UI | Clean navigation: Home · Recipes · About |

---

## 🧠 How the ML Works

```
User types ingredients (e.g. "tomato, onion, garlic")
              ↓
  TF-IDF Vectorizer converts text → numerical vectors
  (rare ingredients weighted higher than common ones)
              ↓
  KNN algorithm finds K nearest recipes
  using cosine similarity in vector space
              ↓
  Results ranked by match score, filtered by user prefs
              ↓
        🍽️  Recipes displayed with match %
```

**TF-IDF (Term Frequency–Inverse Document Frequency)** treats each recipe's ingredient list as a "document" and builds a vocabulary-weighted vector. Common ingredients like "salt" get low weight; specific ones like "tamarind" get high weight.

**KNN (K-Nearest Neighbors)** then places your input vector in the same space and retrieves the *k* closest recipes. Cosine similarity is used so results are based on ingredient overlap angle, not raw magnitude.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                        │
│              React + Vite  (port 5173)                  │
└─────────────────────┬───────────────────────────────────┘
                      │ REST API calls
┌─────────────────────▼───────────────────────────────────┐
│               Node.js + Express                         │
│                  Backend  (port 3000)                   │
│           MongoDB  ←  Custom Recipe CRUD                │
└──────────┬──────────────────────────────────────────────┘
           │ Internal HTTP
┌──────────▼──────────────────────────────────────────────┐
│              Python FastAPI ML Service                  │
│                    (port 8000)                          │
│  ┌─────────────┐  ┌───────────────┐  ┌──────────────┐  │
│  │  TF-IDF     │  │  KNN Model    │  │  Recipes DB  │  │
│  │  Vectorizer │→ │  (cosine sim) │→ │  (.pkl)      │  │
│  └─────────────┘  └───────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
ingredichef/
├── ml-service/                  # 🐍 Python FastAPI — port 8000
│   ├── app.py                   # API routes
│   ├── loader.py                # Model loading
│   ├── recommender.py           # TF-IDF + KNN logic
│   └── artifacts/
│       ├── recipes2.pkl         # Recipe dataset
│       ├── tfidf_vectorizer2.pkl
│       └── knn_model2.pkl
│
├── backend/                     # 🟢 Node.js Express — port 3000
│   ├── server.js
│   ├── models/CustomRecipe.js
│   ├── controllers/recipeController.js
│   └── routes/recipeRoutes.js
│
├── frontend/                    # ⚛️  React + Vite — port 5173
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Recipes.jsx
│       │   └── About.jsx
│       ├── components/
│       └── Api/recipeApi.js
│
├── images/                      # 🖼️  Screenshots
└── videos/
    └── demo.mp4                 # 🎬 Demo video
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed before running the project:

- **Node.js** ≥ 18
- **Python** ≥ 3.9
- **MongoDB** *(optional — only needed for custom recipe persistence)*

### Step 1 — Start the ML Service

```bash
cd ml-service
pip install fastapi uvicorn scikit-learn joblib pandas scipy
uvicorn app:app --reload --port 8000
```

✅ ML service running at `http://localhost:8000`

### Step 2 — Start the Backend

```bash
cd backend
npm install
npm run dev
```

✅ Backend running at `http://localhost:3000`

> ⚠️ Set your MongoDB URI in a `.env` file if you want custom recipes to persist:
> ```
> MONGO_URI=mongodb://localhost:27017/ingredichef
> ```

### Step 3 — Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

✅ App available at `http://localhost:5173`

---

## 🔌 API Reference

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/recommend` | Get ML recipe recommendations |
| `GET` | `/api/suggest?q=` | Real-time ingredient autocomplete |
| `GET` | `/api/custom` | List all saved custom recipes |
| `POST` | `/api/custom` | Add a new custom recipe |
| `DELETE` | `/api/custom/:id` | Delete a custom recipe by ID |

### Example Request & Response

**POST** `/api/recommend`

```json
{
  "ingredients": ["tomato", "onion", "garlic"],
  "filters": {
    "diet": "vegetarian",
    "max_time": 30,
    "servings": 4
  }
}
```

```json
[
  {
    "name": "Dhaba Style Tomato Chutney",
    "match_score": 0.33,
    "cook_time": "15 min",
    "servings": 4,
    "missing": ["mustard oil", "green chillies"]
  },
  {
    "name": "Tomato Garlic Chutney",
    "match_score": 0.14,
    "cook_time": "30 min",
    "servings": 6,
    "missing": ["red chilli", "salt"]
  }
]
```

---

## 👥 Team

| Name | Role | Contribution |
|------|------|-------------|
| **Saksham Varshney** | Frontend Developer | React UI, component design, routing |
| **Suraj Kumar Gupta** | Backend Developer | Express API, MongoDB integration |
| **Singh Krishnaraj** | Document Designer | Documentation, README, project reports |
| **Siddhartha Tiwari** | UI & Structure Designer | Layout, design system, full-stack support |

---

## 🗺️ Roadmap

- [ ] User authentication & personal recipe collections
- [ ] Nutrition info per recipe
- [ ] Voice input for ingredients
- [ ] Mobile app (React Native)
- [ ] Recipe rating & reviews

---

## 📄 License

This project is open for academic and personal use. See `LICENSE` for details.

---

<div align="center">

Made with ❤️ by the IngrediChef Team

*Stop wasting food. Start cooking smarter.*

</div>
