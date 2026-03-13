from fastapi import FastAPI
from pydantic import BaseModel
from loader import load_artifacts
from recommender import RecipeRecommender

app = FastAPI()

tfidf, knn, recipes = load_artifacts()
model = RecipeRecommender(tfidf, knn, recipes)

class RequestData(BaseModel):
    ingredients: str


@app.post("/recommend")

def recommend(data: RequestData):

    res = model.recommend(data.ingredients)

    return {"recipes": res}