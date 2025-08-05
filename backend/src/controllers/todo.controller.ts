import { TodoType } from '../types/Types'
import Todo from '../models/todo.models';
import { create } from '../dao/todo.dao'

exports.create = async (req: TodoType, res: TodoType) => {
  let data = req.body

  const username = data.username
  const todo = data.todo

  try {
    const newTodo = await create({
      username,
      todo,
    });
    res.status(201).json(newTodo)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}

exports.findAll = async (req,res) => {
  try {
    const todos = await todoDAO.readAll();
    res.status(200).json({ status: true, data: todos });
  } catch (error) {
    res.status(500).json({ status: false, error: 'Internal server error' });
  }
}

exports.readById = async (req, res) => {
  const todoId = req.params.id
  try {
    const todo = await todoDAO.readById(todoId)
    res.status(200).json ({ status: true, data: todo})
  } catch (error)
 {
  res.status(500).json({ status: false, error: 'sever error readById'})
 }}

exports.updateById = async (req, res) => {
  const todoId = req.params.id
  const todoData = req.body
  try {
    const todo = await todoDAO.update(todoId, todoData)
    res.status(200).json ({ status: true, data: todo})
  } catch (error)
 {
  res.status(500).json({ status: false, error: 'sever error updateById'})
 }
}

exports.deleteById = async (req, res) => {
  const todoId = req.params.id
  if (!todoId){
    return res.status(400).json({
      status: false,
      error: 'Todo ID is required'
    })
  }
  
  try {
    const deleteTodo = await todoDAO.deleteTodoById(todoId) 

    if (!deleteTodo){
      return res.status(404).json({
        status: false,
        error: 'Todo not found'
      })
    } else {
      res.status(200).json({
        status: true,
        message: `Todo deleted successfully`,
      })
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    })
  }
}