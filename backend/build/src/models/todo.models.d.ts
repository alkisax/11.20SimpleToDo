import mongoose from 'mongoose';
import { TodoType } from '../types/Types';
declare const Todo: mongoose.Model<TodoType, {}, {}, {}, mongoose.Document<unknown, {}, TodoType, {}, {}> & TodoType & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Todo;
