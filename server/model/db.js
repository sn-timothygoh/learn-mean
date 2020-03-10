const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

var uri = "mongodb+srv://timothy:timothy98@cluster0-w2tni.mongodb.net/BudgetTracker?retryWrites=true&w=majority";


mongoose.connect(uri, {useNewUrlParser: true, useFindAndModify : false}, (error) => {
    if (!error) {
        console.log("connected to db");
    } else {
        console.log("connection failed" + error);
    }
});
require('./budget.model');