import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isLoggedIn, logout } from '../service/TodoService'

const Header = () => {

  const location = useLocation()
  const pathName = location.pathname.split("/")[1]
  const isAuth = isLoggedIn()

  const navigator = useNavigate()
  const logoutUser = () => {
    logout()
    navigator("/login")
  }

  return (
    <Navbar variant="dark" bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary text-white">
      <Container>
        <Link to="/" className='text-decoration-none'><Navbar.Brand>Todo Mgmt</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
    
            
          </Nav>
          <div className='d-flex gap-4'>
            {isAuth ? (
              <>
              <Link to="/" className={`text-decoration-none text-secondary ${pathName === "" ? "text-white" : ""}`}>
                Todos
              </Link>
              <div to="/login" className={`text-decoration-none text-secondary`} style={{ cursor: "pointer"}} onClick={logoutUser}>
                Logout
              </div>
              </>
            ) : (
              <>
              <Link to="/register" className={`text-decoration-none text-secondary ${pathName === "register" ? "text-white" : ""}`}>
                Register
              </Link>
              <Link to="/login" className={`text-decoration-none text-secondary ${pathName === "login" ? "text-white" : ""}`}>
                Login
              </Link>
              </>
            )}
            
            
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header