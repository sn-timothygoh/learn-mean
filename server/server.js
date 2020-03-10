require('./model/db');

const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const budgetController = require("./controller/budgetController");

var app = express();

// app.use(parser.json());
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use("/budget", budgetController);

app.set('views', path.join(__dirname, "/views/"));
app.engine('hbs', hbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs',
    defaultLayout : 'mainLayout',
    layoutsDir : 'views/layouts/'
}));
// app.engine('hbs', hbs({extname : 'hbs', defaultLayout : 'mainLayout', layoutsDir : 'views/layouts/'}));
app.set('view engine', 'hbs');

app.listen(1234, () => {
    console.log("server start at port 1234");
});