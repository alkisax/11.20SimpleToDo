"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoZodSchema = void 0;
const zod_1 = require("zod");
exports.todoZodSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    todo: zod_1.z.string().min(1, 'Todo cannot be empty'),
});
//# sourceMappingURL=todo.zod.schema.js.map