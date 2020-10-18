import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoggedUser from './LoggedUser'

const NavigationBar = ({ loggedUser, handleLogout }) => {

  const padding = {
    padding: 5
  }

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">Home</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {loggedUser !== null
              ? <LoggedUser user={loggedUser} handleLogout={handleLogout} />
              : <Link to="/login" style={padding}>Login</Link>
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
}

export default NavigationBar