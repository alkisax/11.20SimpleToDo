import mongoose from 'mongoose';
import { TodoType } from '../types/Types';

const Schema = mongoose.Schema;

const todoSchema = new Schema<TodoType>({
  username:{
    type: String
  },
  todo:{
    type: String,
    required: true
  }
},
{
  collection: 'todo',
  timestamps: true
});

const Todo = mongoose.model<TodoType>('Todo', todoSchema);
export default Todo;