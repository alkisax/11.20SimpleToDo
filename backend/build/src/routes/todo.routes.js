"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const todo_controller_1 = __importDefault(require("../controllers/todo.controller"));
/**
 * @swagger
 * /api/todo:
 *   post:
 *     summary: Add a new todo
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               todo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', todo_controller_1.default.createTodo);
/**
 * @swagger
 * /api/todo:
 *   get:
 *     summary: Get all todos
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Server error
 */
router.get('/', todo_controller_1.default.findAllTodo);
/**
 * @swagger
 * /api/todo/{id}:
 *   get:
 *     summary: Get todo by id
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo id
 *     responses:
 *       200:
 *         description: The requested todo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.get('/:id', todo_controller_1.default.readTodoById);
/**
 * @swagger
 * /api/todo/{id}:
 *   put:
 *     summary: Update todo by id
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               todo:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated todo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Server error
 */
router.put('/:id', todo_controller_1.default.updateTodoById);
/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Delete todo by id
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo id
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', todo_controller_1.default.deleteTodoById);
exports.default = router;
//# sourceMappingURL=todo.routes.js.map