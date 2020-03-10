require('./server/model/db');

const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");

const budgetController = require("./server/controller/budgetController");

var app = express();

app.listen(1234, () => {
    console.log("server start at port 1234");
});

app.use("/testApi", budgetController);

app.set('views', path.join(__dirname, "/views/"));
app.engine('hbs', hbs({extname : 'hbs', defaultLayout : 'mainLayout', layoutsDir : 'views/layouts/'}));
app.set('view engine', 'hbs');