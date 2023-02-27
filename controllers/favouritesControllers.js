const favourites = require("../models/favourites");

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
  console.log("creating fave");
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
    console.log(newFave);
    return res.json(newFave);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "error", message: "could not create new fave" });
  }
};

const deleteFave = async (req, res) => {
  console.log("deleting fave");
  try {
    console.log("trying to delete fave");
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
    console.log(oldFave);
    return res.json(oldFave);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "error", message: "could not create new fave" });
  }
};

module.exports = {
  getFave,
  createFave,
  deleteFave,
};
