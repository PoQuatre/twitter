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
      const matchedUsers = await UserModel.find({
        $or: [
          {
            email: {
              $regex: email,
              $options: 'i',
            },
          },
          {
            handle: {
              $regex: handle,
              $options: 'i',
            },
          },
        ],
      });

      if (matchedUsers.length !== 0) {
        const errors = [];

        for (const user of matchedUsers) {
          if (user.email.toLowerCase() === email.toLowerCase()) {
            errors.push({
              location: 'email',
              cause: 'Un utilisateur avec cette adresse existe déjà',
            });
          }

          if (user.handle.toLowerCase() === handle.toLowerCase()) {
            errors.push({
              location: 'handle',
              cause: 'Un utilisateur avec ce nom existe déjà',
            });
          }
        }

        res.status(409).json({
          success: false,
          errors,
        });
      } else {
        const user = await UserModel.create({
          username,
          email,
          password: await bcrypt.hash(password, 10),
          handle,
        });

        req.login(user, (err) => {
          if (err) {
            res.status(500).json({
              success: false,
              msg: 'An error occurred while processing your request',
            });
          } else {
            res.json({
              success: true,
              user: {
                username,
                handle,
              },
            });
          }
        });
      }
    } catch (err) {
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
  (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err || !user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      } else {
        req.user = user;
        next();
      }
    })(req, res, next);
  },
  (req, res) => {
    res.json({
      success: true,
      user: {
        username: req.user.username,
        handle: req.user.handle,
      },
    });
  },
);

module.exports = router;
