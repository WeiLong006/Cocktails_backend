const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile_number: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    hash: { type: String, required: true },
  },
  {
    collection: "Users",
  }
);

module.exports = mongoose.model("Users", UsersSchema);
