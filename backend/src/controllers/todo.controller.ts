import { Request, Response } from 'express';
import { TodoType, TodoInput } from '../types/Types'
import daoTodo from '../dao/todo.dao'

const createTodo = async (req: Request<TodoType>, res: Response) => {
  let data: TodoType = req.body

  const username: string | undefined = data.username
  const todo = data.todo

  try {
    const newTodo: TodoInput = {
      username,
      todo
    }
    await daoTodo.create(newTodo);
    return res.status(201).json({ status: true, data: newTodo })
  } catch(error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ status: false, error: `create: ${error.message}`})      
    } else {
      return res.status(500).send({ status: false, error: 'unknown error' });
    }
  }
}

const findAllTodo = async (_req: Request, res: Response) => {
  try {
    const todos: TodoType[] = await daoTodo.readAll();
    return res.status(200).json({ status: true, data: todos });
  } catch(error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ status: false, error: `findAll: ${error.message}`})      
    } else {
      return res.status(500).send({ status: false, error: 'unknown error' });
    }
  }
}

const readTodoById = async (req: Request, res: Response) => {
  const todoId: string = req.params.id
  try {
    const todo: TodoType | null = await daoTodo.readById(todoId)

    if (!todo) {
      return res.status(404).json({ status: false, error: 'Todo not found' })
    }

    return res.status(200).json ({ status: true, data: todo})
  } catch (error : unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ status: false, error: `readById: ${error.message}`})
    } else {
      return res.status(500).send({ status: false, error: 'unknown error' });
    }
  }
}

const updateTodoById = async (req: Request, res: Response) => {
  const todoId: string = req.params.id
  const todoData: TodoInput = req.body
  try {
    const todo = await daoTodo.update(todoId, todoData)
    return res.status(200).json ({ status: true, data: todo})
  } catch (error : unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ status: false, error: `updateById: ${error.message}`})
    } else {
      return res.status(500).send({ status: false, error: 'unknown error' });
    }
  }
}

const deleteTodoById = async (req: Request, res: Response) => {
  const todoId: string = req.params.id

  if (!todoId){
    return res.status(400).json({ status: false, error: 'Todo ID is required' })
  }
  
  try {
    const deleteTodo: TodoType | null = await daoTodo.deleteById(todoId) 

    if (!deleteTodo){
      return res.status(404).json({ status: false, error: 'Todo not found' })
    } else {
      return res.status(200).json({ status: true, message: `Todo deleted successfully` })
    }

  } catch (error : unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ status: false, error: `deleteById: ${error.message}`})
    } else {
      return res.status(500).send({ status: false, error: 'unknown error' });
    }
  }
}

export default {
  createTodo, 
  findAllTodo,
  readTodoById,
  updateTodoById,
  deleteTodoById,
}