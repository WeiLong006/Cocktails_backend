const express = require("express");
const router = express.Router();
const { getFave } = require("../controllers/favouritesControllers");

// Get user favourites
router.get("/favourites", getFave);

// // Create new user
// router.put("/create-new-user", createNewUser);

// // Login
// router.post("/login", login);

// // Refresh access_token
// router.post("/refresh", getRefreshToken);

module.exports = router;
