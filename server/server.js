require("./model/db");

const express = require("express");
const cors = require("cors");
const ws = require("express-ws");

// require('dotenv').config();

// const path = require("path");
// const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
// const Handlebars = require("handlebars");
// const {
//   allowInsecurePrototypeAccess
// } = require("@handlebars/allow-prototype-access");

const app = express();
const port = 5001;

// const corsOption = {
//   exposedHeaders: 'auth-header',
// };
// app.use(corsOption);


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
const wsInstance = ws(app);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const budgetRouter = require("./routes/budget");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/users");
const feedRouter = require("./routes/feed");
const cacheRouter = require("./routes/cache");

app.use("/budget", budgetRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/feed", feedRouter);
app.use("/cache", cacheRouter);

app.ws('/post', (ws, req) => {
  ws.on('message', function incoming(message) {
    console.log(message);
    ws.broadcast(message);
  });

  ws.broadcast = function broadcast(data) {
    wsInstance.getWss().clients.forEach(function each(client){
      client.send(data);
    });
  }
});

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
// app.engine(
//   "hbs",
//   hbs({
//     extname: "hbs",
//     defaultLayout: "mainLayout",
//     layoutsDir: "views/layouts/"
//   })
// );
// app.set("view engine", "hbs");

app.listen(port, () => {
  console.log(`server start at port ${port}`);
});
