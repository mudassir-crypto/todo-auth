import axios from 'axios'

const BASE_URL = "http://localhost:8080/api/todo"
const AUTH_BASE_URL = "http://localhost:8080/api/auth"


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers["Authorization"] = getToken()
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

// auth
export const registerUser = async (user) => await axios.post(`${AUTH_BASE_URL}/register`, user)
export const loginUser = async (user) => await axios.post(`${AUTH_BASE_URL}/login`, user)

export const setToken = (token) => sessionStorage.setItem("token", token)
export const getToken = () => sessionStorage.getItem("token")

export const saveLoggedInUser = (username) => sessionStorage.setItem("authenticatedUser", username)
export const getLoggedInUser = () => sessionStorage.getItem("authenticatedUser")

export const isLoggedIn = () => {
  const token = getToken()
  if(token){
    const withoutBasic = window.atob(token.split(" ")[1])
    const username = withoutBasic.split(":")[0]
    
    const authUser = getLoggedInUser()

    if(username === authUser){
      return true
    } else {
      return false
    }
  } else {
    return false
  }
  
}

export const logout = () => {
  sessionStorage.removeItem("authenticatedUser")
  sessionStorage.removeItem("token")
}