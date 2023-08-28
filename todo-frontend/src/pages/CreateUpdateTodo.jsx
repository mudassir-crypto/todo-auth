import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { createTodo, getTodo, updateTodo } from '../service/TodoService'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const CreateUpdateTodo = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [errors, setErrors] = useState({
    title: '',
    description: ''
  })

  const navigator = useNavigate()

  const { id } = useParams()

  const nav = useLocation()
  const path = nav.pathname.split('/')[1]

  useEffect(() => {
    (async () => {
      if(path !== "add-todo"){
        const { data } = await getTodo(id)
        setTitle(data.title)
        setDescription(data.description)
        setCompleted(data.completed)
      }
      
    })()
  }, [path])

  const validateForm = () => {
    let valid = true;

    const errorsCopy = {...errors}

    console.log({
      trimT: title.trim(),
      trimD: description.trim()
    })
    if(title.trim()){
      errorsCopy.title = ''
    } else {
      errorsCopy.title = 'Title is required'
      valid = false
    }
    
    if(description.trim()){
      errorsCopy.description = ''
    } else {
      errorsCopy.description = 'Description is required'
      valid = false
    }
    setErrors(errorsCopy)
    return valid
  }

  const onCreateSubmit = async (e) => {
    e.preventDefault()
    if(validateForm()){
      if(path === "add-todo"){
        try {
          const { data } = await createTodo({ title, description, completed })
          navigator('/')
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      } else if(id) {
        try {
          const { data } = await updateTodo(id, { title, description, completed })
          navigator('/')
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  const onUpdateSubmit = async (e) => {
    e.preventDefault()
    if(validateForm()){
      try {
        const { data } = await updateTodo(id, { title, description, completed })
        navigator('/')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className='container'>
      
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center mt-2">{path === "add-todo" ? "Add Todo" : "Update Todo" }</h2>
          <div className="card-body">
            <div className="form-group mb-2">
              <label htmlFor="" className="form-label">Title: </label>
              <input
                type="text" 
                placeholder='Enter Todo title'
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                
              />
              <div className='invalid-feedback'>{errors.title}</div>
            </div>

            <div className="form-group mb-2">
              <label htmlFor="" className="form-label">Description: </label>
              <input
                type="text" 
                placeholder='Enter Todo description'
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
              />
              <div className='invalid-feedback'>{errors.description}</div>
            </div>

            <div className="form-group mb-2">
              <label htmlFor="" className="form-label">Completion Status: </label>
              <select className='form-select' onChange={(e) => setCompleted(e.target.value)} value={completed}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>

            <div className="d-grid my-3">
              <Button className="btn btn-primary" onClick={onCreateSubmit}>Add</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUpdateTodo