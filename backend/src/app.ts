import express from 'express';
import cors from 'cors';
import swaggerSpec from './swagger/swagger';
import swaggerUi from 'swagger-ui-express';
import todoRoutes from './routes/todo.routes';

const app = express()

app.use(cors())
app.use(express.json());

app.use((req, _res, next) => {
  console.log("Request reached Express!");
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.use('/api/todo', todoRoutes)

app.use(express.static('dist')) 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


export default app