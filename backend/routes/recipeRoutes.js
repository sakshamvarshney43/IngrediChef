const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/recipeController");
const { getOgImage } = require("../controllers/ogImageController");

router.post("/recommend",      ctrl.recommend);
router.get("/suggest",         ctrl.suggest);
router.get("/og-image",        getOgImage);        // ← new
router.get("/custom",          ctrl.getCustom);
router.post("/custom",         ctrl.addCustom);
router.delete("/custom/:id",   ctrl.deleteCustom);

module.exports = router;
