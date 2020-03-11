'use strict';
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

var uri =
  "mongodb+srv://timothy:timothy98@cluster0-w2tni.mongodb.net/BudgetTracker?retryWrites=true&w=majority";

mongoose.connect(uri,
  { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true},
  error => {
    if (!error) {
      console.log("Connection to Mongodb has established");
    } else {
      console.log("connection failed " + error);
    }
  }
);
require("../model/budget.model");
