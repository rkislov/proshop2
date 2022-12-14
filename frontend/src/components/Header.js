import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink} from 'react-router-dom'
import { logout } from '../actions/userActions'



function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <Navbar.Brand href="/">ProShop</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  
                    
                      <Nav.Link as={NavLink} to='/cart' ><i className='fas fa-shopping-cart'></i>Корзина</Nav.Link>
                    
                    
                      {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                          
                            <NavDropdown.Item as={NavLink} to='/profile' >Профиль</NavDropdown.Item>
                          
                          <NavDropdown.Item onClick={logoutHandler}>Выход</NavDropdown.Item>

                        </NavDropdown>
                      ):(
                        <Nav.Link as={NavLink} to='/login'><i className='fas fa-user'></i>Вход</Nav.Link>
                      )}
                      
                      
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    </header>
  )
}

export default Header
