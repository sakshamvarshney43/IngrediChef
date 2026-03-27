# 🍳 IngrediChef — AI Recipe Recommendation System

**Find recipes from ingredients you already have, powered by KNN + TF-IDF machine learning.**

---

## 📌 Overview

IngrediChef is an AI-powered web application that recommends recipes based on ingredients provided by the user. It uses **machine learning (KNN + TF-IDF)** to intelligently match ingredients with recipes and provide the best possible suggestions.

The system also supports filters such as **diet type (veg/non-veg), cooking time, servings, and course type**, making it highly practical and user-friendly.

---

## 🎯 Objectives

* Suggest recipes using available ingredients
* Minimize food wastage
* Provide intelligent ranking using ML
* Enable filtering (veg/non-veg, time, servings, etc.)
* Allow users to add and manage custom recipes

---

## 🧠 Machine Learning Approach

### 🔹 TF-IDF (Term Frequency - Inverse Document Frequency)

* Converts ingredient text into numerical vectors
* Highlights important ingredients based on frequency

### 🔹 KNN (K-Nearest Neighbors)

* Finds similar recipes based on ingredient similarity
* Uses cosine similarity for comparison

### 🔹 Workflow

1. User inputs ingredients
2. Ingredients are converted into TF-IDF vectors
3. KNN algorithm finds nearest recipes
4. Top matching recipes are returned

---

## 🏗️ System Architecture

### Components

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **ML Service:** Python FastAPI
* **Database:** MongoDB (optional for custom recipes)

### Flow

Frontend → Backend → ML Service → Response → Frontend Display

---

## 📂 Project Structure

```
ingredichef/
├── ml-service/          ← Python FastAPI (port 8000)
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
└── frontend/            ← React + Vite (port 5173)
    └── src/
        ├── pages/  Home.jsx | Recipes.jsx | About.jsx
        ├── components/
        └── Api/recipeApi.js
```

---

## ⚙️ Features

* 🔍 Ingredient-based ML recipe search
* 💡 Real-time ingredient autocomplete
* 🏷️ Filters (diet, course, cook time, servings)
* 🟡 Missing ingredient suggestions
* 🛒 Grocery list with checkbox + print
* ➕ Add & manage custom recipes
* 📋 Step-by-step cooking instructions
* 📺 YouTube + full recipe links
* 🌐 Multi-page interface (Home · Recipes · About)

---

## 🔌 API Endpoints

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| POST   | /api/recommend  | Get recipe recommendations |
| GET    | /api/suggest?q= | Ingredient autocomplete    |
| GET    | /api/custom     | List all custom recipes    |
| POST   | /api/custom     | Add a custom recipe        |
| DELETE | /api/custom/:id | Delete a custom recipe     |

---

## 🚀 Quick Start

### 1 · ML Service

```
cd ml-service
pip install fastapi uvicorn scikit-learn joblib pandas scipy
uvicorn app:app --reload --port 8000
```

### 2 · Backend

```
cd backend
npm install
npm run dev
```

> ⚠️ MongoDB is optional — custom recipes won’t persist without it.

### 3 · Frontend

```
cd frontend
npm install
npm run dev
```

---

## 📊 Sample Input & Output

**Input:**

```
Ingredients: Tomato, Onion, Chicken  
Filter: Non-Veg  
```

**Output:**

* Chicken Curry
* Tomato Chicken Masala
* Spicy Chicken Gravy

---

## ▶️ Demo

```
Demo Video: https://your-video-link.com
```

Or local file:

```
videos/demo.mp4
```

---

## 📎 Media Folder Setup

```
ingredichef/
│── images/
│── videos/
│   ├── demo.mp4
```

---

## 👥 Team

* Saksham Varshney — ML Engineer
* Suraj Kumar Gupta — Backend Developer
* Singh Krishnaraj — Frontend Developer
* Siddhartha Tiwari — Full Stack & Data

---

## ✅ Conclusion

IngrediChef is a powerful AI-based solution that simplifies cooking decisions by recommending recipes based on available ingredients. It effectively combines machine learning with full-stack development to deliver accurate and user-friendly results.

---
