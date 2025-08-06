"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_dao_1 = __importDefault(require("../dao/todo.dao"));
const createTodo = async (req, res) => {
    const data = req.body;
    const username = data.username;
    const todo = data.todo;
    try {
        const newTodo = {
            username,
            todo
        };
        const savedTodo = await todo_dao_1.default.create(newTodo);
        return res.status(201).json({ status: true, data: savedTodo });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ status: false, error: `create: ${error.message}` });
        }
        else {
            return res.status(500).send({ status: false, error: 'unknown error' });
        }
    }
};
const findAllTodo = async (_req, res) => {
    try {
        const todos = await todo_dao_1.default.readAll();
        return res.status(200).json({ status: true, data: todos });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ status: false, error: `findAll: ${error.message}` });
        }
        else {
            return res.status(500).send({ status: false, error: 'unknown error' });
        }
    }
};
const readTodoById = async (req, res) => {
    const todoId = req.params.id;
    try {
        const todo = await todo_dao_1.default.readById(todoId);
        if (!todo) {
            return res.status(404).json({ status: false, error: 'Todo not found' });
        }
        return res.status(200).json({ status: true, data: todo });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ status: false, error: `readById: ${error.message}` });
        }
        else {
            return res.status(500).send({ status: false, error: 'unknown error' });
        }
    }
};
const updateTodoById = async (req, res) => {
    const todoId = req.params.id;
    const todoData = req.body;
    try {
        const todo = await todo_dao_1.default.update(todoId, todoData);
        return res.status(200).json({ status: true, data: todo });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ status: false, error: `updateById: ${error.message}` });
        }
        else {
            return res.status(500).send({ status: false, error: 'unknown error' });
        }
    }
};
const deleteTodoById = async (req, res) => {
    const todoId = req.params.id;
    if (!todoId) {
        return res.status(400).json({ status: false, error: 'Todo ID is required' });
    }
    try {
        const deleteTodo = await todo_dao_1.default.deleteById(todoId);
        if (!deleteTodo) {
            return res.status(404).json({ status: false, error: 'Todo not found' });
        }
        else {
            return res.status(200).json({ status: true, message: 'Todo deleted successfully' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ status: false, error: `deleteById: ${error.message}` });
        }
        else {
            return res.status(500).send({ status: false, error: 'unknown error' });
        }
    }
};
exports.default = {
    createTodo,
    findAllTodo,
    readTodoById,
    updateTodoById,
    deleteTodoById,
};
//# sourceMappingURL=todo.controller.js.map