const axios = require("axios");

const cache = new Map(); // in-memory cache so we don't refetch on every render

async function getOgImage(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "url required" });

  if (cache.has(url)) return res.json({ image: cache.get(url) });

  try {
    const response = await axios.get(url, {
      timeout: 6000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; IngrediChef/1.0; +https://ingredichef.app)",
        Accept: "text/html",
      },
      maxContentLength: 500_000, // only grab first 500KB (enough for <head>)
    });

    const html = response.data;

    // Try og:image first, then twitter:image, then first <img src>
    const patterns = [
      /property=["']og:image["']\s+content=["']([^"']+)["']/i,
      /content=["']([^"']+)["']\s+property=["']og:image["']/i,
      /name=["']twitter:image["']\s+content=["']([^"']+)["']/i,
      /content=["']([^"']+)["']\s+name=["']twitter:image["']/i,
    ];

    let image = null;
    for (const pat of patterns) {
      const m = html.match(pat);
      if (m && m[1] && m[1].startsWith("http")) { image = m[1]; break; }
    }

    cache.set(url, image);
    return res.json({ image });
  } catch (err) {
    cache.set(url, null); // cache the failure too
    return res.json({ image: null });
  }
}

module.exports = { getOgImage };
