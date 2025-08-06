"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mongoose_to_swagger_1 = __importDefault(require("mongoose-to-swagger"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const todo_models_1 = __importDefault(require("../models/todo.models"));
const isCompiled = __dirname.includes('build');
const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            version: '1.0.0',
            title: '11.20 simple to do',
            description: 'for exercise 11.20',
        },
        components: {
            schemas: {
                Todo: (0, mongoose_to_swagger_1.default)(todo_models_1.default),
            },
        },
    },
    // 👇 This is the critical part: tell swagger-jsdoc where to find your route/controller annotations
    // apis: ['../routes/*.ts', '../controllers/*.ts'], // adjust paths if needed
    apis: isCompiled
        ? [path_1.default.join(__dirname, '../routes/*.js'), path_1.default.join(__dirname, '../controllers/*.js')]
        : [path_1.default.join(__dirname, '../routes/*.ts'), path_1.default.join(__dirname, '../controllers/*.ts')],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map