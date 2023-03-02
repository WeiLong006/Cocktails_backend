const express = require("express");
const router = express.Router();
const {
  getFave,
  createFave,
  deleteFave,
  deleteAll,
  searchCocktails,
} = require("../controllers/favouritesControllers");

// Get user favourites
router.get("/favourites", getFave);

// // Create new faveourites
router.put("/create-fave", createFave);

// Delete Fave
router.delete("/delete-fave", deleteFave);

// Delete All
router.delete("/delete-all", deleteAll);

// Search Cocktail
router.get("/search", searchCocktails);

module.exports = router;
