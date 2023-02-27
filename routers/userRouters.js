const express = require("express");
const router = express.Router();
const {
  createUser,
  signIn,
  refreshToken,
} = require("../controllers/usersControllers");

// Create new user
router.put("/create-user", createUser);

// Login
router.post("/sign-in", signIn);

// Refresh access_token
router.post("/refresh", refreshToken);

module.exports = router;
