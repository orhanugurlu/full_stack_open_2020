import React from 'react'
import { Button } from 'react-bootstrap'

const LoggedUser = ({ user, handleLogout }) => {
  return (
    <>{user.name} logged in <Button id='logoutbutton' onClick={handleLogout}>Logout</Button></>
  )
}

export default LoggedUser