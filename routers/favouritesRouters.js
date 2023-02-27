const express = require("express");
const router = express.Router();
const {
  getFave,
  createFave,
  deleteFave,
} = require("../controllers/favouritesControllers");

// Get user favourites
router.get("/favourites", getFave);

// // Create new faveourites
router.put("/create-fave", createFave);

// Delete Fave
router.delete("/delete", deleteFave);

// // Refresh access_token
// router.post("/refresh", getRefreshToken);

module.exports = router;
