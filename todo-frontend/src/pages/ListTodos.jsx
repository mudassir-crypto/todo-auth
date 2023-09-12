import { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { completeTodo, deleteTodo, fetchAllTodo, inCompleteTodo } from '../service/TodoService'
import { getToken } from '../service/AuthService'
import { Link, useNavigate } from 'react-router-dom'

const ListTodos = () => {

  const [todos, setTodos] = useState([])

  const token = getToken()
  const fetchTodos = async () => {
    
    const { data } = await fetchAllTodo(token)
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const navigator = useNavigate()
  const updateTodoRoute = (todoId) => {
    navigator(`/update-todo/${todoId}`)
  }

  const deleteTodoClick = async (todoId) => {
    try{
      await deleteTodo(todoId, token)
      fetchTodos()
    } catch (error){
      console.log("You are not authorised to perform this action")
    }
  }

  const markAsComplete = async (todoId) => {
    await completeTodo(todoId, token)
    fetchTodos()
  }

  const markAsInComplete = async (todoId) => {
    await inCompleteTodo(todoId, token)
    fetchTodos()
  }

  return (
    <div className=''>
      <h1 className='text-center mb-4 text-primary'>Todo List</h1>
      <Link to='/add-todo' className='btn btn-primary mb-2'>Add Todo</Link>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                {todo.completed ? "YES" : "NO"}
              </td>
              <td className='d-flex gap-2'>
                <Button className="btn btn-primary" onClick={() => updateTodoRoute(todo.id)}>Update</Button>
                <Button className="btn btn-danger" onClick={() => deleteTodoClick(todo.id)}>Delete</Button>
                {todo.completed ? (
                  <Button className="btn btn-info" onClick={() => markAsInComplete(todo.id)}>Incomplete</Button>
                ) : (
                  <Button className="btn btn-success" onClick={() => markAsComplete(todo.id)}>Complete</Button>
                )}
              </td>
            </tr>
          ))}
          
        </tbody>
      </Table>
    </div>
  );
}

export default ListTodos