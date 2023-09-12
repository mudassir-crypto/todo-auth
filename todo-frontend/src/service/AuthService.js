
import axios from "axios"
const AUTH_BASE_URL = "http://localhost:8080/api/auth"

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
    return true
  } else {
    return false
  }
}

export const logout = () => {
  sessionStorage.removeItem("authenticatedUser")
  sessionStorage.removeItem("token")
}