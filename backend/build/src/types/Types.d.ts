import { Document } from 'mongoose';
export interface TodoType extends Document {
    username?: string;
    todo: string;
}
export interface TodoInput {
    username?: string;
    todo?: string;
}
