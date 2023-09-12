import axios from 'axios'
import { getToken } from './AuthService'

const BASE_URL = "http://localhost:8080/api/todo"


//Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = getToken()
  if(token){
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})


export const fetchAllTodo = async () => await axios.get(`${BASE_URL}/all`)

export const createTodo = async (todo) => await axios.post(`${BASE_URL}/create`, todo)

export const getTodo = async (todoId) => await axios.get(`${BASE_URL}/${todoId}`)

export const updateTodo = async (todoId, updatedTodo) => await axios.put(`${BASE_URL}/${todoId}`, updatedTodo)

export const deleteTodo = async (todoId) => await axios.delete(`${BASE_URL}/${todoId}`) 

export const completeTodo = async (todoId) => await axios.patch(`${BASE_URL}/${todoId}/complete`)
export const inCompleteTodo = async (todoId) => await axios.patch(`${BASE_URL}/${todoId}/incomplete`)



