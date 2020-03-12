const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../model/user.model");

const TOKEN_SECRET = "uhsduh92hfhwes8hwbdguwrgho213rtrio";

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    pwd: req.body.password
  });
  try {
    const savedUser = await user.save();
    res.send({
      user: savedUser._id
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.route("/login").post(async (req, res) => {
  await User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      res.status(204);
    } else {
      console.log("user: " + user);
      bcrypt
        .compare(req.body.password, user.pwd)
        .then(match => (match ? res.sendStatus(200) : res.sendStatus(204)));

      const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
      res.header("auth-header", token);
      res.json({ success: true, message: "Logged in" });
    }
  });
});

// router.post('/login', async (req, res) => {
//   const user = await User.findOne({
//     username : req.body.username
//   });
//   if (!user) return res.status(400).json({registered : false});
//   console.log(user);
//   const validPass = await bcrypt.compare(req.body.password, user.pwd);
//   if (!validPass) return res.status(400).json({password : false});

//   //create token and add it to header
//   const token = jwt.sign({_id : user._id, token_secret});
//   res.header('auth-header', token);
//   res.json({success: true, message: 'Logged in'});
//   res.sendStatus(200);
// });
module.exports = router;
