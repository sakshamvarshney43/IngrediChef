class RecipeRecommender:

    def __init__(self, tfidf, knn, recipes):
        self.tfidf = tfidf
        self.knn = knn
        self.recipes = recipes

    def recommend(self, ingredients, n=5):

        vec = self.tfidf.transform([ingredients])

        dist, idx = self.knn.kneighbors(vec, n_neighbors=20)

        results = []
        seen = set()

        for i in idx[0]:

            row = self.recipes.iloc[i]
            title = row["name"]

            if title in seen:
                continue

            seen.add(title)

            results.append({
                "title": title,
                "ingredients": row["ingredients"],
                "instructions": row["steps"],
                "time": int(row["minutes"])   # ← added field
            })

            if len(results) == n:
                break

        return results