const express = require("express");
const router = express.Router();
const { getFave, createFave } = require("../controllers/favouritesControllers");

// Get user favourites
router.get("/favourites", getFave);

// // Create new faveourites
router.put("/create-fave", createFave);

// // Login
// router.post("/login", login);

// // Refresh access_token
// router.post("/refresh", getRefreshToken);

module.exports = router;
