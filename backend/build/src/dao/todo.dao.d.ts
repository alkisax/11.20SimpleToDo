import { TodoType, TodoInput } from '../types/Types';
declare const _default: {
    create: (todoData: TodoInput) => Promise<TodoType>;
    readAll: () => Promise<TodoType[]>;
    readById: (todoId: string) => Promise<TodoType | null>;
    update: (todoId: string, todoData: TodoInput) => Promise<TodoType | null>;
    deleteById: (todoId: string) => Promise<TodoType | null>;
};
export default _default;
