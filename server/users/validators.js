const { body } = require("express-validator");
const  User  = require('./user.model');


const emailAlreadyExists = async (value) => {
    const userExists = await User.exists({ email: value });

    if (userExists) {
        return Promise.reject('E-mail already in use');
    }

    return true;
};


const userCreateValidator = () => [
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email format')
        .bail()
        .custom(emailAlreadyExists),

    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

module.exports =  {userCreateValidator,} ;