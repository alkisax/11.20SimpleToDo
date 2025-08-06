import { Request, Response } from 'express';
declare const _default: {
    createTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    findAllTodo: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    readTodoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateTodoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteTodoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default _default;
