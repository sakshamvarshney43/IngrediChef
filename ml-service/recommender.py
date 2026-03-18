import re

STOP_UNITS = {
    'tablespoon','tablespoons','teaspoon','teaspoons','cup','cups','tbsp','tsp',
    'kg','g','grams','ml','l','to','taste','as','required','thinly','sliced',
    'deseeded','powder','seeds'
}

def clean_ingredients(raw: str) -> list[str]:
    """Parse raw ingredient string from the CSV into a list of clean names."""
    result = []
    for item in str(raw).split(','):
        words = [
            w for w in re.sub(r'[^a-zA-Z ]', '', item).lower().split()
            if w not in STOP_UNITS
        ]
        cleaned = ' '.join(words).strip()
        if cleaned:
            result.append(cleaned)
    return result


class RecipeRecommender:
    def __init__(self, df, tfidf, knn):
        self.df    = df
        self.tfidf = tfidf
        self.knn   = knn

    def recommend(self, ingredients: list[str], n: int = 10) -> list[dict]:
        user_input  = ' '.join([i.lower().strip() for i in ingredients])
        user_vector = self.tfidf.transform([user_input])

        k = min(n * 3, self.df.shape[0])
        distances, indices = self.knn.kneighbors(user_vector, n_neighbors=k)

        result = self.df.iloc[indices[0]].copy()
        result = result.drop_duplicates(subset='TranslatedRecipeName')

        # Compute match count for ranking / missing ingredient suggestion
        user_set = set(i.lower().strip() for i in ingredients)

        records = []
        for _, row in result.head(n).iterrows():
            recipe_ings = clean_ingredients(
                row.get('TranslatedIngredients', row.get('Ingredients', ''))
            )
            recipe_set = set(recipe_ings)

            matched   = user_set & recipe_set
            missing   = recipe_set - user_set
            match_pct = round(len(matched) / max(len(recipe_set), 1) * 100)

            # Build numbered steps
            raw_steps = str(row.get('TranslatedInstructions', ''))
            step_parts = [s.strip() for s in re.split(r'[.!?]', raw_steps) if s.strip()]
            numbered_steps = [f"{i+1}. {s.capitalize()}." for i, s in enumerate(step_parts)]

            records.append({
                "title":        str(row.get('TranslatedRecipeName', 'Unknown')),
                "cuisine":      str(row.get('Cuisine', '')),
                "course":       str(row.get('Course', '')),
                "diet":         str(row.get('Diet', '')),
                "servings":     str(row.get('Servings', '')),
                "time":         int(row.get('TotalTimeInMins', 0)) if str(row.get('TotalTimeInMins', '')).isdigit() else 0,
                "ingredients":  recipe_ings,
                "steps":        numbered_steps,
                "youtube":      str(row.get('YouTube Link', '')),
                "url":          str(row.get('URL', '')),
                "match_pct":    match_pct,
                "missing":      list(missing)[:8],
            })

        return records

    def suggest_ingredients(self, partial: str, limit: int = 10) -> list[str]:
        """Return ingredient suggestions matching a partial string."""
        partial = partial.lower().strip()
        seen = set()
        suggestions = []
        for raw in self.df['TranslatedIngredients'].dropna():
            for ing in clean_ingredients(raw):
                if partial in ing and ing not in seen:
                    seen.add(ing)
                    suggestions.append(ing)
                    if len(suggestions) >= limit:
                        return suggestions
        return suggestions
