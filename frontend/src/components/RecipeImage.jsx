import { useState, useEffect } from "react";
import { fetchOgImage } from "../Api/recipeApi";

// Course → fallback Unsplash photo (reliable, no API key needed)
const FALLBACKS = {
  "main course": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
  "side dish": "https://images.unsplash.com/photo-1626500155537-93690c24099e?w=600&q=80",
  "dessert": "https://th.bing.com/th/id/R.c4558e0299e6795c00f07e4b88aa356b?rik=TjCwSB%2fuYgAYqg&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f2070420%2fthumbs%2fo-INDIAN-DESSERT-facebook.jpg&ehk=Ktu11n6IYiK1cP4pNh0tqOwsRBEoE1FKOjB9GSceFa8%3d&risl=&pid=ImgRaw&r=0",
  "snack": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
  "breakfast": "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80",
  "lunch": "https://tse2.mm.bing.net/th/id/OIP.VHQoBEHakdG03pfAF1g5kQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
  "dinner": "https://www.shutterstock.com/shutterstock/photos/1372403591/display_1500/stock-photo-delicious-spicy-chicken-biryani-in-white-bowl-on-white-background-indian-or-pakistani-ramzan-food-1372403591.jpg",
  default: "https://www.authenticindiatours.com/app/uploads/2024/10/Indian-Vegetables-1400-collage-1400x550-c-default.jpg",
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
