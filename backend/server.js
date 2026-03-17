const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", recipeRoutes);

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
