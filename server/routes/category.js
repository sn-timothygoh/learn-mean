const router = require("express").Router();
let User = require("../model/category.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const category = req.body.category;
  const user = new User({ category });
  user
    .save()
    .then(() => res.json("Category added."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;