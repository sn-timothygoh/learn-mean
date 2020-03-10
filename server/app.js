// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var expressHandlebars = require("express-handlebars");
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var logger = require('morgan');
// var cors = require('cors');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var testApiRouter = require('./routes/testApi');


// const mongoose = require("mongoose");
// var uri = "mongodb+srv://timothy:timothy98@cluster0-w2tni.mongodb.net/test?retryWrites=true&w=majority";

// const budget = require("./model/budget_model");

// mongoose.connect(uri, {useNewUrlParser: true}, (error) => {
//   if (!error) {
//     console.log("connection success");
//   } else {
//     console.log("connection failed");
//   }
// })

// const budgetController = require("./controller/budgetController");

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/testApi', testApiRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.use(bodyParser.urlencoded({
//   extended : true
// }));

// app.use("/budget", budgetController);

// app.set('views', path.join(__dirname, "/views/"));

// app.engine("handlebars", expressHandlebars({
//   extname : "handlebars",
//   defaultLayout : "mainlayout",
//   layoutsDir : __dirname + "/views/layouts"
// }));

// app.set("view engine", "handlebars");

// app.listen("1234", () => {
//   console.log("server started");
// })

// app.get("/", (req, res) => {
//   // res.send('<h1>Testing</h1>');
//   res.render("testApi", {});
// });

// module.exports = app;
