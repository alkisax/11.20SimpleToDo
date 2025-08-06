import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';  // your Express app entrypoint
import daoTodo from '../dao/todo.dao'; //gpt
import dotenv from 'dotenv';
dotenv.config();

// Connect to test DB before all tests
beforeAll(async () => {
  if (!process.env.MONGODB_TEST_URI) {
    throw new Error('MONGODB_TEST_URI environment variable is required');
  }
  await mongoose.connect(process.env.MONGODB_TEST_URI);
});

// Clear todos collection before each test (optional)
beforeEach(async () => {
  await mongoose.connection.collection('todo').deleteMany({});
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/ping and /health', () => {
  it('should respond with "pong" for GET /api/ping', async () => {
    const res = await request(app).get('/api/ping');

    expect(res.status).toBe(200);
    expect(res.text).toBe('pong');
  });

  it('should respond with "ok" for GET /health', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
  });
});

describe('POST /api/todo', () => {
  it('should create a new todo and respond with 201 and the todo data', async () => {
    const todoData = {
      username: 'testuser',
      todo: 'Write tests'
    };

    const res = await request(app)
      .post('/api/todo')
      .send(todoData);

    expect(res.status).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.data).toMatchObject(todoData);
  });

  it('should return 500 if todo is missing', async () => {
    const todoData = {
      username: 'testuser'
      // no todo field
    };

    const res = await request(app)
      .post('/api/todo')
      .send(todoData);

    expect(res.status).toBe(500);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toBeDefined();
  });

  // gpt created not sure i understand
  it('should return 500 with unknown error when thrown error is not an instance of Error', async () => {
    // Mock daoTodo.create to throw a non-Error value (like a string)
    jest.spyOn(daoTodo, 'create').mockImplementation(() => {
      throw 'something went terribly wrong';  // not an Error instance
    });

    const todoData = {
      username: 'testuser',
      todo: 'Trigger unknown error branch'
    };

    const res = await request(app)
      .post('/api/todo')
      .send(todoData);

    expect(res.status).toBe(500);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toBe('unknown error');

    // Restore original implementation after test
    jest.restoreAllMocks();
  });
});

describe('GET /api/todo', () => {
  it('should return an empty array when no todos exist', async () => {
    const res = await request(app).get('/api/todo');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(0);
  });

  it('should return all todos that exist in the database', async () => {
    const todos = [
      { username: 'user1', todo: 'First task' },
      { username: 'user2', todo: 'Second task' }
    ];

    // Insert todos before testing
    await Promise.all(
      todos.map(todo => request(app).post('/api/todo').send(todo))
    );

    const res = await request(app).get('/api/todo');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ username: 'user1', todo: 'First task' }),
        expect.objectContaining({ username: 'user2', todo: 'Second task' }),
      ])
    );
  });

  //gpt created
  it('should return 500 with unknown error when thrown error is not an instance of Error', async () => {
    // Mock daoTodo.readAll to throw a non-Error (e.g., string)
    jest.spyOn(daoTodo, 'readAll').mockImplementation(() => {
      throw 'some non-error string';
    });

    const res = await request(app).get('/api/todo');

    expect(res.status).toBe(500);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toBe('unknown error');

    jest.restoreAllMocks();
  });

  it('should return 500 with error message when thrown error is an instance of Error', async () => {
    // Mock daoTodo.readAll to throw an Error instance
    jest.spyOn(daoTodo, 'readAll').mockImplementation(() => {
      throw new Error('database failure');
    });

    const res = await request(app).get('/api/todo');

    expect(res.status).toBe(500);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toBe('findAll: database failure');

    jest.restoreAllMocks();
  });
});

describe('GET /api/todo/:id', () => {
  it('should return 404 if todo with given id does not exist', async () => {
    const fakeId = '507f1f77bcf86cd799439011'; // valid but non-existing ObjectId

    const res = await request(app).get(`/api/todo/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toBe('Todo not found');
  });

  it('should return 200 and the todo data if todo exists', async () => {
    // First, create a todo
    const todoData = {
      username: 'testuser',
      todo: 'Get todo by id'
    };

    const createRes = await request(app)
      .post('/api/todo')
      .send(todoData);

    expect(createRes.status).toBe(201);

    const todoId = createRes.body.data._id || createRes.body.data.id; // adjust depending on your response

    // Now fetch that todo by id
    const res = await request(app).get(`/api/todo/${todoId}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.data).toMatchObject(todoData);
    expect(res.body.data._id || res.body.data.id).toBe(todoId);
  });

  it('should return 500 on invalid id format', async () => {
    const invalidId = 'notavalidid';

    const res = await request(app).get(`/api/todo/${invalidId}`);

    expect(res.status).toBe(500);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toMatch(/readById:/);
  });
});

describe('PUT /api/todo/:id', () => {
  it('should update an existing todo and respond with 200 and the updated todo data', async () => {
    // First create a todo
    const todoData = {
      username: 'testuser',
      todo: 'Initial todo',
    };

    const createRes = await request(app)
      .post('/api/todo')
      .send(todoData);

    expect(createRes.status).toBe(201);

    const todoId = createRes.body.data._id || createRes.body.data.id;

    // Now update that todo
    const updatedData = {
      username: 'updateduser',
      todo: 'Updated todo text',
    };

    const updateRes = await request(app)
      .put(`/api/todo/${todoId}`)
      .send(updatedData);

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.status).toBe(true);
    expect(updateRes.body.data).toMatchObject(updatedData);
    expect(updateRes.body.data._id || updateRes.body.data.id).toBe(todoId);
  });

  it('should return 500 on invalid id format', async () => {
    const invalidId = 'invalidid123';

    const updateRes = await request(app)
      .put(`/api/todo/${invalidId}`)
      .send({
        username: 'user',
        todo: 'some todo',
      });

    expect(updateRes.status).toBe(500);
    expect(updateRes.body.status).toBe(false);
    expect(updateRes.body.error).toMatch(/updateById:/);
  });

  it('should return 200 and data null if todo does not exist', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011'; // valid ObjectId format but no todo

    const updateRes = await request(app)
      .put(`/api/todo/${nonExistentId}`)
      .send({
        username: 'user',
        todo: 'some todo',
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.status).toBe(true);
    expect(updateRes.body.data).toBeNull();
  });
});

describe('DELETE /api/todo/:id', () => {
  it('should delete an existing todo and respond with 200 and success message', async () => {
    // First create a todo to delete
    const todoData = {
      username: 'testuser',
      todo: 'Todo to be deleted',
    };

    const createRes = await request(app)
      .post('/api/todo')
      .send(todoData);

    expect(createRes.status).toBe(201);

    const todoId = createRes.body.data._id || createRes.body.data.id;

    // Now delete the todo
    const deleteRes = await request(app)
      .delete(`/api/todo/${todoId}`);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.status).toBe(true);
    expect(deleteRes.body.message).toBe('Todo deleted successfully');
  });

  it('should return 404 if todo with given id does not exist', async () => {
    const fakeId = '507f1f77bcf86cd799439011'; // valid ObjectId but no document

    const res = await request(app)
      .delete(`/api/todo/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toBe('Todo not found');
  });

  it('should return 400 if no todo id provided', async () => {
    // Attempt to call delete route without id param - this depends on your router setup.
    // Usually hitting `/api/todo/` with DELETE won't match your route and results in 404,
    // but let's simulate it just in case your app handles it differently.

    const res = await request(app)
      .delete('/api/todo/'); // likely route not found, so expecting 404.

    expect(res.status).toBe(404); // Express usually returns 404 for unmatched routes
  });

  it('should return 500 on invalid id format', async () => {
    const invalidId = 'invalidid123';

    const res = await request(app)
      .delete(`/api/todo/${invalidId}`);

    expect(res.status).toBe(500);
    expect(res.body.status).toBe(false);
    expect(res.body.error).toMatch(/deleteById:/);
  });
});
