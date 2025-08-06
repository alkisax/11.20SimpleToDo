"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import m2s from 'mongoose-to-swagger';
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            version: "1.0.0",
            title: "11.20 simple to do",
            description: "for exercise 11.20",
        },
        components: {
        // schemas: {
        //   Admin: m2s(Admin),
        // },
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    // 👇 This is the critical part: tell swagger-jsdoc where to find your route/controller annotations
    apis: ['./routes/*.js', './controllers/*.js'], // adjust paths if needed
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map