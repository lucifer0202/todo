const { body, validationResult } = require("express-validator");

module.exports = [
  // Title must be a string and not empty
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),

  // Description should be a string if provided
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  // Status must be one of the following values
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "done"])
    .withMessage(
      "Status must be one of the following: pending, in-progress, done"
    ),

  // Custom validation to check for errors in the request
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
