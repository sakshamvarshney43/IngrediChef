import joblib
from scipy.sparse import load_npz
import os

def load_artifacts():
    base = os.path.dirname(os.path.abspath(__file__))
    artifacts = os.path.join(base, "artifacts")

    df    = joblib.load(os.path.join(artifacts, "recipes2.pkl"))
    tfidf = joblib.load(os.path.join(artifacts, "tfidf_vectorizer2.pkl"))
    knn   = joblib.load(os.path.join(artifacts, "knn_model2.pkl"))

    return df, tfidf, knn
