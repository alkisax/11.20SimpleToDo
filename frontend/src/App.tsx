import { useEffect, useState } from 'react';
import type { Todo } from './types/types';
import { fetchTodos, createTodo, deleteTodo } from './utils/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      alert(error);
    }
  }

  async function handleAdd() {
    if (!newTodo.trim()) return alert('Todo text is required');
    try {
      const created = await createTodo({ username, todo: newTodo });
      setTodos([...todos, created]);
      setNewTodo('');
    } catch (error) {
      alert(error);
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    try {
      await deleteTodo(id);
      setTodos(todos.filter(t => t._id !== id));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 16 }}>
      <h1>Todo List</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="New Todo"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={handleAdd}>Add Todo</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <strong>{todo.username || 'anonymous'}</strong>: {todo.todo}
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
