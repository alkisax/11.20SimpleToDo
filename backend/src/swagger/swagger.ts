import m2s from 'mongoose-to-swagger';
import swaggerJsdoc from 'swagger-jsdoc';
import Todo from '../models/todo.models'

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      version: "1.0.0",
      title: "11.20 simple to do",
      description: "for exercise 11.20",
    },
    components: {
      schemas: {
        Todo: m2s(Todo),
      },
    },
  },
  // 👇 This is the critical part: tell swagger-jsdoc where to find your route/controller annotations
  apis: ['../routes/*.ts', '../controllers/*.ts'], // adjust paths if needed
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
