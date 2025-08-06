import type { Todo } from '../types/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todo`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  const data = await res.json();
  return data.data;
}

export async function createTodo(todo: { username?: string; todo: string }): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  const data = await res.json();
  return data.data;
}

export async function updateTodo(id: string, todo: { username?: string; todo: string }): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todo/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  const data = await res.json();
  return data.data;
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/todo/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete todo');
}
