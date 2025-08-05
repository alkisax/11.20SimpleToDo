"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./swagger/swagger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// import adminRoutes from './routes/admin.routes';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, _res, next) => {
    console.log("Request reached Express!");
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
// app.use('/api/admin', adminRoutes)
app.use(express_1.default.static('dist'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map