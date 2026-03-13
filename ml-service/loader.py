import joblib

def load_artifacts():

    tfidf = joblib.load(open("artifacts/tfidf_vectorizer.pkl","rb"))
    knn = joblib.load(open("artifacts/recipes_knn_model.pkl","rb"))
    recipes = joblib.load(open("artifacts/recipes_combined.pkl","rb"))

    return tfidf, knn, recipes