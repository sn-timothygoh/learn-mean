const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      required: true
    },
    lname: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      required: true
    },
    username: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      unique: true,
      trim: true,
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
