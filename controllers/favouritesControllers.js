const favourites = require("../models/favourites");
const cocktail = require("../models/cocktail");

const searchCocktails = async (req, res) => {
  try {
    const search = await cocktail.find({
      name: { $regex: req.body.name, $options: "i" },
    });
    console.log(req.body);
    return res.json(search);
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "cocktail not on list" });
  }
};

// Get favourites of logged in user
const getFave = async (req, res) => {
  try {
    const data = await favourites.find({ email: req.body.email });
    return res.json(data);
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "request to get favourites" });
  }
};

const createFave = async (req, res) => {
  try {
    const data = await favourites.findOne({
      name: req.body.name,
    });
    const userEmail = await favourites.findOne({ email: req.body.email });
    if (data && userEmail) {
      return res.status(400).json({
        status: "error",
        message: "This cocktail exisits on your favourites list!",
      });
    }
    console.log("trying to create fave");
    const newFave = {
      name: req.body.name,
      category: req.body.category,
      instruction: req.body.instruction,
      glass: req.body.glass,
      ingredient1: req.body.ingredient1,
      ingredient2: req.body.ingredient2,
      ingredient3: req.body.ingredient3,
      ingredient4: req.body.ingredient4,
      ingredient5: req.body.ingredient5,
      image: req.body.image,
      email: req.body.email,
    };
    await favourites.insertMany(newFave);
    return res.json(newFave);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "error", message: "could not create new fave" });
  }
};

const deleteFave = async (req, res) => {
  try {
    const oldFave = {
      name: req.body.name,
      category: req.body.category,
      instruction: req.body.instruction,
      glass: req.body.glass,
      ingredient1: req.body.ingredient1,
      ingredient2: req.body.ingredient2,
      ingredient3: req.body.ingredient3,
      ingredient4: req.body.ingredient4,
      ingredient5: req.body.ingredient5,
      image: req.body.image,
      email: req.body.email,
    };
    await favourites.deleteOne(oldFave);
    return res.json(oldFave);
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "could not create new fave" });
  }
};

const deleteAll = async (req, res) => {
  try {
    const user = { email: req.body.email };
    await favourites.deleteMany(user);
    return res.json("All your favourites has been deleted!");
  } catch (error) {
    return res
      .status(400)
      .json({ status: "error", message: "could not create new fave" });
  }
};

module.exports = {
  getFave,
  createFave,
  deleteFave,
  deleteAll,
  searchCocktails,
};
