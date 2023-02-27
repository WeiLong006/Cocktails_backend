require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const fave = require("./routers/favouritesRouters");
const users = require("./routers/userRouters");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB(process.env.MONGODB_URI);

// Route to all volunteer endpoints
app.use("/fave", fave);

// Route to all user endpoints
app.use("/users", users);

// Seed data:
const userSeed = require("./models/userSeed");
const cocktailSeed = require("./models/cocktailSeed");
const favouritesSeed = require("./models/favouritesSeed");
const userSchema = require("./models/user");
const cocktailSchema = require("./models/cocktail");
const favouritesSchema = require("./models/favourites");

app.get("/seed", async (req, res) => {
  userSchema.create(userSeed, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("user added");
    }
  });

  cocktailSchema.create(cocktailSeed, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("cocktail added");
    }
  });

  favouritesSchema.create(favouritesSeed, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("favourites added");
    }
  });
  return res.json("seed successful");
});

app.listen(process.env.PORT, () => {
  console.log(`server started on Port ${process.env.PORT}`);
});
