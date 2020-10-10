import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loggedUserReducer'

const LoggedUser = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedUser)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <p>{user.name} logged in <button id='logoutbutton' onClick={handleLogout}>Logout</button></p>
  )

}

export default LoggedUser