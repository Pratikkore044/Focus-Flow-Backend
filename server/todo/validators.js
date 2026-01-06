const { query, param, body } = require("express-validator")

const getTodoValidator =() =>[
    query('page').optional().isInt({min:1}).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({min:1,max:50}).withMessage('Limit must be a positive integer between 1 and 100')
]



const todoIdValidator = () => 
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ObjectId');


const createTodoValidator = () => [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Todo title is required'),

  body('isCompleted')
    .optional()
    .isBoolean()
    .withMessage('Completed must be boolean')
];



const updateTodoValidator = () => [
  param('id')
    .isMongoId()
    .withMessage('ID must be a valid MongoDB ObjectId'),

  body()
    .custom(value => {
      if (!value || Object.keys(value).length === 0) {
        throw new Error('At least one field must be provided for update');
      }
      return true;
    }),
  
  body('title')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Todo must be a non-empty string'),

  body('isCompleted')
    .optional()
    .isBoolean()
    .withMessage('Completed must be boolean')
];


const deleteTodoValidator = () =>
    param('id').isMongoId().withMessage('ID must be a valid MongoDB ObjectId');


module.exports = {getTodoValidator
, todoIdValidator, createTodoValidator, updateTodoValidator, deleteTodoValidator};