const { logger } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message}`);
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
