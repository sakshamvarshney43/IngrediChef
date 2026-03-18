import { useState, useEffect } from "react";
import { fetchOgImage } from "../Api/recipeApi";

// Course → fallback Unsplash photo (reliable, no API key needed)
const FALLBACKS = {
  "main course":  "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
  "side dish":    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  "dessert":      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
  "snack":        "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&q=80",
  "breakfast":    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80",
  "lunch":        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
  "dinner":       "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  default:        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
};

function getFallback(course) {
  if (!course) return FALLBACKS.default;
  const key = course.toLowerCase().trim();
  return FALLBACKS[key] || FALLBACKS.default;
}

export default function RecipeImage({ recipeUrl, course, title }) {
  const [src,     setSrc]     = useState(null);   // null = loading
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (!recipeUrl || recipeUrl === "nan") {
      setSrc(getFallback(course));
      return;
    }

    let cancelled = false;
    setSrc(null); // reset to skeleton on new recipe

    fetchOgImage(recipeUrl)
      .then((img) => {
        if (cancelled) return;
        setSrc(img || getFallback(course));
      })
      .catch(() => {
        if (cancelled) return;
        setSrc(getFallback(course));
      });

    return () => { cancelled = true; };
  }, [recipeUrl, course]);

  const displaySrc = errored ? getFallback(course) : src;

  return (
    <div className="relative w-full h-44 bg-white/5 overflow-hidden">
      {/* Skeleton shimmer while loading */}
      {!displaySrc && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse" />
      )}

      {displaySrc && (
        <img
          src={displaySrc}
          alt={title}
          onError={() => setErrored(true)}
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: displaySrc ? 1 : 0 }}
          loading="lazy"
        />
      )}

      {/* Subtle gradient overlay so text above is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
}
