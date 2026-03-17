from fastapi import FastAPI
from pydantic import BaseModel
from loader import load_artifacts
from recommender import RecipeRecommender
import uvicorn

app = FastAPI()

tfidf, knn, recipes = load_artifacts()
model = RecipeRecommender(tfidf, knn, recipes)

class RequestData(BaseModel):
    ingredients: str


@app.post("/recommend")
def recommend(data: RequestData):

    res = model.recommend(data.ingredients)

    return {"recipes": res}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)