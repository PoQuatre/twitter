const router = require('express').Router();
const { UserModel } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('../config/passport');

router.post('/register', async (req, res) => {
  const { username, email, password, handle } = req.body;

  try {
    await UserModel.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      handle,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: 'An error occurred while processing your request',
    });
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

module.exports = router;
