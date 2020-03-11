const router = require("express").Router();
let User = require("../model/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const pwd = req.body.password;
  const user = new User({ username, firstname, lastname, pwd });
  user
    .save()
    .then(() => res.json("User added."))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.route("/login").post((req, res) => {
//   User.findOne()
// })

// router.get("/", function(req, res, next) {
//   res.render("Server is now running", { title: "Site under construction" });
// });
module.exports = router;
