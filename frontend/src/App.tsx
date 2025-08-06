import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import type { Todo } from './types/types';
import { fetchTodos, createTodo, deleteTodo } from './utils/api';

import Layout from './layouts/Layout';
import Homepage from './pages/Homepage';
import Health from './pages/Health';

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
    <>
      <Routes>
          {/* Parent route with Layout */}
          {/* αυτό το  route δεν τελειώνει εδω αλλα περικλύει όλα τα υπόλοιπα */}
          <Route element={
            <Layout 
            />
          }> 

            <Route 
              path="/" 
              element={<Homepage 
                username={username}
                newTodo={newTodo}
                handleAdd={handleAdd}
                todos={todos}
                setUsername={setUsername}
                setNewTodo={setNewTodo}
                handleDelete={handleDelete}
              />}
            />

            <Route 
              path="/health"
              element={<Health />}
            />
          </Route>
        </Routes>    
    </>
  );
}

export default App;
