require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const Users = require("../models/user");

//Sign in
const signIn = async (req, res) => {
  console.log("signing in");
  try {
    //check if email exists
    const user = await Users.findOne({ email: req.body.email });
    // if user exists, check password
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.hash);
      //if password do not match, return error
      if (!result) {
        return res.status(400).json({
          status: "error",
          message: "username or password is incorrect!",
        });
      }
      // If email and password is correct:
      // Create JWT
      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
      };

      // Generate access token via JWT
      const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "20m",
        jwtid: uuidv4(),
      });

      // Generate refresh token via JWT
      const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "30D",
        jwtid: uuidv4(),
      });

      const response = { access, refresh };
      return res.json(response);
    }
  } catch (error) {
    console.log("error");
    console.log("PUT /users/create", error);
    res.status(400).json({ status: "error", message: "an error has occured" });
  }
};

const createUser = async (req, res) => {
  console.log("creating user");
  try {
    //check if email exists
    const user = await Users.findOne({ email: req.body.email });
    //if user exists, throw error
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists, please log in!",
      });
    }
    //encrypt password
    const hash = await bcrypt.hash(req.body.password, 15);
    //create new user
    const newUser = new Users({
      name: req.body.name,
      mobile_number: req.body.mobile_number,
      email: req.body.email,
      hash: hash,
      role: req.body.role,
    });
    await newUser.save();
    return res.json({ status: "ok", message: "User Created" });
  } catch (error) {
    console.log("PUT /users/create", error);
    res.status(400).json({ status: "error", message: "an error has occured" });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const delUser = Users.findOne({ email: req.body.email });

  if (!delUser) {
    return res.status(400).json({
      status: "error",
      message: "User does not exist!",
    });
  }

  await Users.deleteOne(delUser);
  console.log(delUser);
  return res.json("User deleted");
};

//Update password
const updatePassword = async (req, res) => {
  try {
    const user = Users.findOne({ email: req.body.email });
    if (user) {
      const hash = await bcrypt.hash(req.body.password, 15);
      await Users.updateOne(user, hash);
      console.log(req.body.password);
      return res.json("password updated!");
    } else {
      return res.status(400).json({
        status: "error",
        message: "User does not exist!",
      });
    }
  } catch (error) {
    console.log("POST /users/refresh", error);
    res.status(401).json({ status: "error", message: "update failed" });
  }
};

//Generate refresh token
const refreshToken = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const payload = {
      id: decoded.id,
      name: decoded.name,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const response = { access };
    res.json(response);
  } catch (error) {
    console.log("POST /users/refresh", error);
    res.status(401).json({ status: "error", message: "unauthorised" });
  }
};

module.exports = {
  createUser,
  signIn,
  deleteUser,
  updatePassword,
  refreshToken,
};
