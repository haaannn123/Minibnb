const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({checkFalsy: true})
      .isLength({min: 1})
      .withMessage('Please provide a valid first name.'),
    check('lastName')
      .exists({checkFalsy: true})
      .isLength({min: 1})
      .withMessage('Please provide a valid last name'),
    handleValidationErrors
  ];

  router.post('/', validateSignup, async (req, res) => {
      const { firstName, lastName, email, username, password } = req.body;

      const userEmail = await User.findOne({
        where:
        { email }
      })
      const userUsername = await User.findOne({
        where:
        { username }
      })

      if (userEmail) {
        return res.status(403).json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }

      if (userUsername) {
        return res.status(403).json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "username": "User with that username already exists"
          }
        })
      }

      const user = await User.signup({...req.body});

      let token = await setTokenCookie(res, user);

      res.json({
        id: user.id,
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        token: token
      });
    }
  );

module.exports = router;
