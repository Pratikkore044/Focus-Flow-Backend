const { formatResponse } = require('../utils/formatResponse');
const { createUser } = require('./user.service');
const {signJwt}  = require('../auth/utils');
const express = require('express');
const handleValidation = require('../middlewares/handleValidation');
const  { userCreateValidator}  = require('./validators');


const userRouter = express.Router();


userRouter.post('/', userCreateValidator(),handleValidation,async function(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body missing or malformed' });
    }

    const { email, fullName, password } = req.body;
    console.log(email, fullName, password);
    const user = await createUser(email, fullName, password);
    const token = signJwt({ id: user._id, email: user.email });
    return formatResponse(
        res,
        "User created successfully",
        { token }, 
        null,
        201
    );
  } catch (err) {
      return formatResponse(
        res,
        'User creation failed',
        null,
        { message: 'Internal server error' },
        500
      );
    }
  }
);


module.exports =  userRouter ;