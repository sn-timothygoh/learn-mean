const router = require("express").Router();
const bcrypt = require("bcryptjs");
let User = require("../model/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const username = req.body.username;
  const pwd = req.body.password;
  const user = new User({ fname, lname, username, pwd });
  user
    .save()
    .then(() => res.json("User added."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      res.status(204);
    } else {
      bcrypt
        .compare(req.body.password, user.pwd)
        .then(match => (match ? res.sendStatus(200) : res.sendStatus(204)));
    }
  });
});
module.exports = router;
