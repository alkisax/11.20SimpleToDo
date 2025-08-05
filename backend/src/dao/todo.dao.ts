import { TodoType } from '../types/Types'
import Todo from '../models/todo.models';

export const create = async (todoData: TodoType): Promise<TodoType> => {
  const todo = new Todo(todoData);
  return await todo.save();
};

export const readAll = async (): Promise<TodoType[]> => {
  return await Todo.find();
};

export const readById = async (todoId: string): Promise<TodoType | null> => {
  return await Todo.findById(todoId)
}

export const update = async (todoId: string, todoData: TodoType): Promise<TodoType | null> => {
  return await Todo.findByIdAndUpdate(todoId, todoData, { new: true })
}

export const deleteTodoById = async (todoId: string): Promise<TodoType | null> => {
  return await Todo.findByIdAndDelete(todoId)
}
