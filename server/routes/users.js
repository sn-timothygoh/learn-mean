const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let User = require('../model/user.model')

const TOKEN_SECRET = 'uhsduh92hfhwes8hwbdguwrgho213rtrio'

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(async (req, res) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    pwd: req.body.password,
  })
  try {
    const savedUser = await user.save()
    res.send({
      user: savedUser._id,
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

router.route('/login').post(async (req, res) => {
  await User.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      res.status(204)
    } else {
      console.log('user ' + user.username + ' is loggin in')
      bcrypt
        .compare(req.body.password, user.pwd)
        .then(match => (match ? res.sendStatus(200) : res.sendStatus(204)))

      const token = jwt.sign({ _id: user._id }, TOKEN_SECRET)
      res.header('auth-header', token)
      res.json({ success: true, message: 'Logged in' })
    }
  })
})
module.exports = router
