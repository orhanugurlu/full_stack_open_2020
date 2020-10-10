import React from 'react'

const LoggedUser = ({ user, handleLogout }) => {
  return (
    <p>{user.name} logged in <button id='logoutbutton' onClick={handleLogout}>Logout</button></p>
  )
}

export default LoggedUser