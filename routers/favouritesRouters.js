const express = require("express");
const router = express.Router();
const {
  getFave,
  createFave,
  deleteFave,
  deleteAll,
} = require("../controllers/favouritesControllers");

// Get user favourites
router.get("/favourites", getFave);

// // Create new faveourites
router.put("/create-fave", createFave);

// Delete Fave
router.delete("/delete-fave", deleteFave);

// Delete All
router.delete("/delete-all", deleteAll);

module.exports = router;
