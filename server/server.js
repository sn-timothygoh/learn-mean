require("./model/db");

const express = require("express");
const path = require("path");
// const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
// const Handlebars = require("handlebars");
// const {
//   allowInsecurePrototypeAccess
// } = require("@handlebars/allow-prototype-access");

const budgetRouter = require("./routes/budget");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/users");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use("/budget", budgetRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);

// app.set("views", path.join(__dirname, "/views/"));
// app.engine(
//   "hbs",
//   hbs({
//     handlebars: allowInsecurePrototypeAccess(Handlebars),
//     extname: "hbs",
//     defaultLayout: "mainLayout",
//     layoutsDir: "views/layouts/"
//   })
// );
// app.engine('hbs', hbs({extname : 'hbs', defaultLayout : 'mainLayout', layoutsDir : 'views/layouts/'}));
// app.set("view engine", "hbs");

app.listen(5000, () => {
  console.log(`server start at port 5000`);
});
