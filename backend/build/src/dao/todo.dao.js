"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_models_1 = __importDefault(require("../models/todo.models"));
const create = async (todoData) => {
    const todo = new todo_models_1.default(todoData);
    return await todo.save();
};
const readAll = async () => {
    return await todo_models_1.default.find();
};
const readById = async (todoId) => {
    return await todo_models_1.default.findById(todoId);
};
const update = async (todoId, todoData) => {
    return await todo_models_1.default.findByIdAndUpdate(todoId, todoData, { new: true });
};
const deleteById = async (todoId) => {
    return await todo_models_1.default.findByIdAndDelete(todoId);
};
exports.default = {
    create,
    readAll,
    readById,
    update,
    deleteById
};
//# sourceMappingURL=todo.dao.js.map