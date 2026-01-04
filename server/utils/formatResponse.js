const express = require("express");

const formatResponse = (
    res,
    message,
    data = null,
    error = null,
    statusCode = 200
) => {
if (error) {
        return res.status(statusCode).json({
            message: error.message || message || "Error occurred",
            data: null,
            error:error.message ? { message: error.message } : error 
        });
    }

    return res.status(statusCode).json({
        message,
        data,
      });
};

module.exports = {formatResponse};