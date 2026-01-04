const { validationResult } = require('express-validator');
const { formatResponse } = require('../utils/formatResponse');

const handleValidation = (req, res, next) => {
  const result = validationResult(req);

   if (!result.isEmpty()) {
    const errors = result.array().map(err => ({
      field: err.path,
      message: err.msg,
    }));

    return formatResponse(
      res,
      'Validation failed',
      null,
      { errors },
      400
    );
  }

  next();
};

module.exports = handleValidation;
