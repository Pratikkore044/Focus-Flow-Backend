const express = require('express');
const { getTodos, updateTodo, deleteTodo } = require('./service');
const { getTodoById } = require('./service');
const { formatResponse } = require('../utils/formatResponse');
const { createTodo } = require('./service');
const { getTodoValidator, todoIdValidator, createTodoValidator, updateTodoValidator, deleteTodoValidator } = require('./validators');
const { validationResult } = require('express-validator');
const handleValidation = require('../middlewares/handleValidation');
const Todo = require('./todo.model');
const validateUser = require("../middlewares/validateUser");
const todoRouter = express.Router();



todoRouter.get('/', getTodoValidator(), handleValidation, async (req, res) => {

    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const user = req.user;
    try {
        const todos = await getTodos(limit, page, user);
        return formatResponse(res, "todos fetched", todos);
    }
    catch (error) {
        console.error(error);
        return formatResponse(res, 'couldnt fetch todos', null, error);
    }
});




todoRouter.get('/:id', todoIdValidator(), handleValidation, async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        if (todo) {
            return formatResponse(res, 'todo fetched', todo);
        } else {
            return formatResponse(res, 'Todo not found', null, { message: 'No todo with the given ID' }, 404);
        }
    }
    catch (error) {
        return formatResponse(res, 'could`nt fetch todo', null, error, 500);
    }
});



todoRouter.post('/', validateUser,
    createTodoValidator(), handleValidation,
    async (req, res) => {

        try {
            const todo = req.body;
            const user = req.user;
            const newTodo = await createTodo(todo, user);
            return formatResponse(res, 'todo created', newTodo);

        } catch (error) {
            console.error('Error creating todo:', error);
            return formatResponse(res, 'could not create todo', null, error);
        }
    });



todoRouter.put('/:id', validateUser, updateTodoValidator(), handleValidation, async (req, res) => {
    const todoId = req.params.id;
    const updatedFields = req.body;
    const user = req.user;
    const updatedTodo = await updateTodo(todoId, updatedFields, user);
    if (updatedTodo) {
        return formatResponse(res, 'Todo updated successfully', updatedTodo);
    } else {
        console.error('Error creating todo:', error);
        return formatResponse(res, 'Todo not found', null, { message: 'No todo with the given ID' }, 404);
    }

});




todoRouter.delete('/:id', deleteTodoValidator(), handleValidation, async (req, res) => {
    const todoId = req.params.id;
    const user = req.user;
    try {
        const deletedTodo = await deleteTodo(todoId, user);
        if (deletedTodo) {
            return formatResponse(res, 'Todo deleted successfully', deletedTodo);
        } else {
            return formatResponse(res, 'Todo not found', null, { message: 'No todo with the given ID' }, 404);
        }
    } catch (error) {
        console.error('Error creating todo:', error);
        return formatResponse(res, 'could not  delete todo', null, error);
    }
});

module.exports = todoRouter;