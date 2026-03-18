from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from loader import load_artifacts
from recommender import RecipeRecommender
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

df, tfidf, knn = load_artifacts()
model = RecipeRecommender(df, tfidf, knn)


class RecommendRequest(BaseModel):
    ingredients: List[str]
    n: int = 10


@app.post("/recommend")
def recommend(data: RecommendRequest):
    results = model.recommend(data.ingredients, n=data.n)
    return {"recipes": results}


@app.get("/suggest")
def suggest(q: str = Query(..., min_length=1)):
    return {"suggestions": model.suggest_ingredients(q, limit=10)}


@app.get("/health")
def health():
    return {"status": "ok", "recipes_loaded": len(df)}
