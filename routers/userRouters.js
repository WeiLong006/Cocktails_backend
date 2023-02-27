const express = require("express");
const router = express.Router();
const {
  createUser,
  signIn,
  refreshToken,
  deleteUser,
  updatePassword,
} = require("../controllers/usersControllers");

// Create new user
router.put("/create-user", createUser);

// Login
router.post("/sign-in", signIn);

// Refresh access_token
router.post("/refresh", refreshToken);

//Delete User
router.delete("/delete-user", deleteUser);

//Update password
router.patch("/update-password", updatePassword);

module.exports = router;
