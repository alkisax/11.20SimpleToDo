import { Document } from 'mongoose';

export interface TodoType extends Document{
  username?: string
  todo: string
}