const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      unique: true,
      required: true
    },
    firstName: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      required: true
    },
    lastName: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      required: true
    },
    pwd: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
