import pickle

vectorizer = pickle.load(open("artifacts/tfidf_vectorizer.pkl","rb"))
model = pickle.load(open("artifacts/recipes_knn_model.pkl","rb"))
recipes = pickle.load(open("artifacts/recipes_combined.pkl","rb"))

print("Model loaded successfully")