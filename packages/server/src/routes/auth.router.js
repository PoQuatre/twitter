const router = require('express').Router();
const { UserModel } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('../config/passport');
const { body, validationResult } = require('express-validator');

router.post(
  '/register',

  body('handle')
    .isString()
    .trim()
    .isAlphanumeric('en-US', { ignore: '-_' })
    .isLength({ min: 4, max: 20 }),
  body('username').isString().trim().isLength({ min: 4, max: 20 }).escape(),
  body('email').normalizeEmail().isEmail(),
  body('password').isString().isStrongPassword({ minSymbols: 0 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  },
);

router.post(
  '/login',
  body('email').normalizeEmail(),
  passport.authenticate('local'),
  (req, res) => {
    res.json(req.user);
  },
);

module.exports = router;
