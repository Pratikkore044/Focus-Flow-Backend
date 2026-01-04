const { Router } = require('express');
const authRouter = Router();
const { verifyLoginBody } = require('./validator');
const handleValidation = require('../middlewares/handleValidation');
const { formatResponse } = require('../utils/formatResponse');
const { signJwt } = require('./utils');
const User = require('../users/user.model');
const {comparePassword}  = require('../users/utils');
const validateUser = require('../middlewares/validateUser');



authRouter.post('/login', verifyLoginBody(), handleValidation, async (req, res) => {
    try {
    const { email, password } = req.body;

    // console.log('🔍 Login attempt for email:', email);
    const user = await User.findOne({ email: email }).select('+password');;
    if (!user) {
        return formatResponse(res, 'User not found', null, { message: 'No user with the given email' }, 404);
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (passwordMatch) {
        const token = signJwt({ id: user._id, email: user.email });
        return formatResponse(res, 'Login successful', { token }, null, 200);
    } else {
        return formatResponse(res, 'Invalid credentials', null, { message: 'Email or password incorrect' }, 401);
    } } catch (error) {
        console.error('Login error:', error);
        return formatResponse(res, 'Login failed', null, { message: 'An error occurred during login' }, 500);
    }
});

authRouter.get('/me', validateUser, async(req, res) => {
    try{
        const  user = await User.findById(req.user.id);
        if(!user){
           return formatResponse(res, 'User not found', null, { message: 'User not found' }, 404);
        }
        
    return formatResponse(res, 'User info fetched successfully', {
        email: user.email,
        fullName: user.fullName,
        id: user._id
    }, null, 200);
    }catch(err){
        console.error('Error fetching user info:', err); 
        return formatResponse(res, 'Failed to fetch user info', null, err, 500);
    }
});

module.exports = authRouter;