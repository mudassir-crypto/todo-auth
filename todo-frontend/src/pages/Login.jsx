import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { getLoggedInUser, getToken, isLoggedIn, loginUser, registerUser, saveLoggedInUser, setToken } from '../service/TodoService'
import { useNavigate } from 'react-router-dom'

const Login = () => {


  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({
    usernameOrEmail: '',
    password: ''
  })

  const navigator = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if(validateForm()){
      console.log({usernameOrEmail, password})

      const {data, status} = await loginUser({usernameOrEmail, password})
      console.log(data)
      if(status === 200){
        const token = 'Basic ' + window.btoa(`${usernameOrEmail}:${password}`)
        setToken(token)
        console.log(token)
        console.log(window.atob(token.split(" ")[1]))
        saveLoggedInUser(usernameOrEmail)
        console.log(getLoggedInUser())
        console.log(isLoggedIn())
        navigator("/")
      }
    }
  }


  const validateForm = () => {
    let valid = true;

    const errorsCopy = {...errors}

    if(usernameOrEmail.trim()){
      errorsCopy.usernameOrEmail = ''
    } else {
      errorsCopy.usernameOrEmail = 'Username or Email is required'
      valid = false
    }

    if(password.trim()){
      errorsCopy.password = ''
    } else {
      errorsCopy.password = 'Password is required'
      valid = false
    }
    setErrors(errorsCopy)
    return valid
  }

  return (
    <div className='container'>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col md={6}>
        <Card>
          <Card.Header as="h2" className='text-center'>Login User</Card.Header>
          <Card.Body>
            {/* elements of form */}

            <div className="form-group mb-2">
              <Row>
                <Col md={3}>
                  <label htmlFor="" className="form-label text-center">Username or Email: </label>
                </Col>
                <Col md={9}>
                  <input
                    type="text" 
                    placeholder='Enter Username or Email'
                    value={usernameOrEmail || ''}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    className={`form-control ${errors.usernameOrEmail ? "is-invalid" : ""}`}
                    
                  />
                  <div className='invalid-feedback'>{errors.usernameOrEmail}</div>
                </Col>
              </Row>
            </div>

            <div className="form-group mb-2">
              <Row>
                <Col md={3}>
                  <label htmlFor="" className="form-label text-center">Password: </label>
                </Col>
                <Col md={9}>
                  <input
                    type="password" 
                    placeholder='Enter Password'
                    value={password || ''}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    
                  />
                  <div className='invalid-feedback'>{errors.password}</div>
                </Col>
              </Row>
            </div>

            <div className="d-grid">
              <Button variant="primary" onClick={handleLogin}>Login</Button>
            </div>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      
    </div>
  )
}

export default Login