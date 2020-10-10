import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loggedUserReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(event.target.username.value, event.target.password.value))
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form id="loginform" onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            name="username"
          />
        </div>
        <div>
          Password
          <input
            type="password"
            name="password"
          />
        </div>
        <button id='loginbutton' type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm