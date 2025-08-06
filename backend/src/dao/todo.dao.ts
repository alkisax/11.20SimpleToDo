import { TodoType, TodoInput } from '../types/Types';
import Todo from '../models/todo.models';

const create = async (todoData: TodoInput): Promise<TodoType> => {
  const todo = new Todo(todoData);
  return await todo.save();
};

const readAll = async (): Promise<TodoType[]> => {
  return await Todo.find();
};

const readById = async (todoId: string): Promise<TodoType | null> => {
  return await Todo.findById(todoId);
};

const update = async (todoId: string, todoData: TodoInput): Promise<TodoType | null> => {
  return await Todo.findByIdAndUpdate(todoId, todoData, { new: true });
};

const deleteById = async (todoId: string): Promise<TodoType | null> => {
  return await Todo.findByIdAndDelete(todoId);
};

export default {
  create,
  readAll,
  readById,
  update,
  deleteById
};
