import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { registerUser } from '../service/TodoService'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const navigator = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    if(validateForm()){
      console.log({name, username, email, password})

      const {data} = await registerUser({name, username, email, password})
      console.log(data)
      navigator("/login")
    }
  }


  const validateForm = () => {
    let valid = true;

    const errorsCopy = {...errors}

    if(name.trim()){
      errorsCopy.name = ''
    } else {
      errorsCopy.name = 'Name is required'
      valid = false
    }
    
    if(username.trim()){
      errorsCopy.username = ''
    } else {
      errorsCopy.username = 'Username is required'
      valid = false
    }

    if(email.trim()){
      errorsCopy.email = ''
    } else {
      errorsCopy.email = 'Email is required'
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
          <Card.Header as="h2" className='text-center'>Register User</Card.Header>
          <Card.Body>
            {/* elements of form */}
            <div className="form-group mb-2">
              <Row>
                <Col md={3}>
                  <label htmlFor="" className="form-label text-center">Name: </label>
                </Col>
                <Col md={9}>
                  <input
                    type="text" 
                    placeholder='Enter Name'
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    
                  />
                  <div className='invalid-feedback'>{errors.name}</div>
                </Col>
              </Row>
              
            </div>

            <div className="form-group mb-2">
              <Row>
                <Col md={3}>
                  <label htmlFor="" className="form-label text-center">Username: </label>
                </Col>
                <Col md={9}>
                  <input
                    type="text" 
                    placeholder='Enter Username'
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    
                  />
                  <div className='invalid-feedback'>{errors.username}</div>
                </Col>
              </Row>
            </div>

            <div className="form-group mb-2">
              <Row>
                <Col md={3}>
                  <label htmlFor="" className="form-label text-center">Email: </label>
                </Col>
                <Col md={9}>
                  <input
                    type="text" 
                    placeholder='Enter Email'
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  />
                  <div className='invalid-feedback'>{errors.email}</div>
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
              <Button variant="primary" onClick={handleRegister}>Register</Button>
            </div>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      
    </div>
  )
}

export default Register