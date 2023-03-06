const express = require("express");
const router = express.Router();
const {
  createUser,
  signIn,
  refreshToken,
  deleteUser,
  updatePassword,
  updateRole,
} = require("../controllers/usersControllers");

// Create new user
router.put("/create-user", createUser);

// Login
router.post("/sign-in", signIn);

// Refresh access_token
router.post("/refresh", refreshToken);

//Delete User
router.post("/delete-user", deleteUser);

//Update password
router.patch("/update-password", updatePassword);

//Update Role
router.patch("/update-role", updateRole);

module.exports = router;
