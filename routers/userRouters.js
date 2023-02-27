const express = require("express");
const router = express.Router();
const {
  createUser,
  signIn,
  refreshToken,
  deleteUser,
} = require("../controllers/usersControllers");

// Create new user
router.put("/create-user", createUser);

// Login
router.post("/sign-in", signIn);

// Refresh access_token
router.post("/refresh", refreshToken);

//Delete User
router.delete("/delete-user", deleteUser);

module.exports = router;
