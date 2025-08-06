"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const todoSchema = new Schema({
    username: {
        type: String
    },
    todo: {
        type: String,
        required: true
    }
}, {
    collection: 'todo',
    timestamps: true
});
const Todo = mongoose_1.default.model('Todo', todoSchema);
exports.default = Todo;
//# sourceMappingURL=todo.models.js.map