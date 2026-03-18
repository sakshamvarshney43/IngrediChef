const express  = require("express");
const cors     = require("cors");
const mongoose = require("mongoose");

const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ingredichef";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅  MongoDB connected"))
  .catch((e) => console.warn("⚠️  MongoDB not connected (custom recipes disabled):", e.message));

app.use("/api", recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀  Backend on http://localhost:${PORT}`));
