import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ user, setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username, password,
      })
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ text: 'Wrong credentials!', class: 'error' })
    }
  }

  const handleLogout = () => {
    setUser(null)
  }

  const renderForm = () => {
    return (
      <div>
        <h2>Login to application</h2>
        <form id="loginform" onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='loginbutton' type="submit">Login</button>
        </form>
      </div>)
  }

  const renderLoggedUser = () => {
    return (
      <p>{user.name} logged in <button id='logoutbutton' onClick={handleLogout}>Logout</button></p>
    )
  }

  return (
    <div>
      {user === null ? renderForm() : renderLoggedUser()}
    </div>
  )
}

export default Login