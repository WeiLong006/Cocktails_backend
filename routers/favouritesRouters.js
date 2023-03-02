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
router.post("/favourites", getFave);

// // Create new faveourites
router.put("/create-fave", createFave);

// Delete Fave
router.post("/delete-fave", deleteFave);

// Delete All
router.post("/delete-all", deleteAll);

// Search Cocktail
router.post("/search", searchCocktails);

module.exports = router;
