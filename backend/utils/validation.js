const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Validation error");
    err.errors = errors;
    err.status = 400;
    err.title = "";
    next(err);
  }
  next();
};


const handleSpotValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.statusCode = 400
    next(err);
  }
  next();
};

const handleReviewValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.statusCode = 400
    next(err);
  }
  next();
};


const handleBookingValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.statusCode = 400
    next(err);
  }
  next();
};

const validateSpot = [
  check('address')
    .notEmpty()
    .withMessage("Street address is required"),
  check('city')
    .notEmpty()
    .withMessage("City is required"),
  check('state')
    .notEmpty()
    .withMessage("State is required"),
  check('country')
    .notEmpty()
    .withMessage("Country is required"),
  check('lat')
    .isFloat({min: -90, max: 90})
    .withMessage("Latitude is not valid"),
  check('lng')
    .isFloat({min: -180, max: 180})
    .withMessage("Longitude is not valid"),
  check('name')
    .notEmpty()
    .isLength({min: 2, max: 300})
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .notEmpty()
    .withMessage("Description is required"),
  check('price', "Price per day is required")
    .notEmpty()
    .bail()
    .isNumeric()
    .withMessage("Price per day is required"),
    handleSpotValidationErrors
]

const validateReview = [
    check('review')
      .notEmpty()
      .withMessage("Review text is required"),
    check('stars')
      .notEmpty()
      .bail()
      .isFloat({min: 1, max: 5})
      .withMessage("Stars must be an integer from 1 to 5"),
      handleReviewValidationErrors
];


module.exports = {
  handleValidationErrors, handleSpotValidationErrors , handleReviewValidationErrors, validateSpot, validateReview
};
