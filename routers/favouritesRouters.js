const express = require("express");
const router = express.Router();
const {
  getFave,
  createFave,
  deleteFave,
  deleteAll,
  searchCocktails,
} = require("../controllers/favouritesControllers");

const auth = require("../Authentication/auth");
const auth_admin = require("../Authentication/auth_admin");

// Get user favourites
router.post("/favourites", auth_admin, getFave);

// // Create new faveourites
router.put("/create-fave", auth_admin, createFave);

// Delete Fave
router.post("/delete-fave", auth_admin, deleteFave);

// Delete All
router.post("/delete-all", auth_admin, deleteAll);

// Search Cocktail
router.post("/search", auth, searchCocktails);

module.exports = router;
