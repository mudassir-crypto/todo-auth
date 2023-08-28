import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ListTodos from './pages/ListTodos'
import Header from './components/Header'
import Footer from './components/Footer'
import CreateUpdateTodo from './pages/CreateUpdateTodo'
import Register from './pages/Register'
import Login from './pages/Login'
import { isLoggedIn } from './service/TodoService'

const App = () => {

  function AuthenticatedRoute({ children }){
    const isAuth = isLoggedIn()

    if(isAuth){
      return children
    } else {
      console.log("change");
      return <Navigate to="/login" />
    }
  }

  return (
    <>
      <BrowserRouter>
      <Header />
      <div className='container mx-auto mt-5'>
      <Routes>
        
          <Route path='/' element={<AuthenticatedRoute><ListTodos/></AuthenticatedRoute>} />
          <Route path='/add-todo' element={<AuthenticatedRoute><CreateUpdateTodo/></AuthenticatedRoute>} />
          <Route path='/update-todo/:id' element={<AuthenticatedRoute><CreateUpdateTodo/></AuthenticatedRoute>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
        
      </Routes>
      </div>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
