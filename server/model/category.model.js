const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      unique: true,
      required: true
    },
  }
);

module.exports = mongoose.model("Category", categorySchema);
