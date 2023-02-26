const mongoose = require("mongoose");

const CocktailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: false },
    instruction: { type: String, required: true },
    glass: { type: String, required: true },
    ingredient1: { type: String, required: true },
    ingredient2: { type: String, required: false },
    ingredient3: { type: String, required: false },
    ingredient4: { type: String, required: false },
    ingredient5: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    collection: "Cocktails",
  }
);

module.exports = mongoose.model("Cocktails", CocktailsSchema);
