import React from 'react'

const LoginForm = ({ handleLogin }) => {

  const doLogin = (event) => {
    event.preventDefault()
    handleLogin(event.target.username.value, event.target.password.value)
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form id="loginform" onSubmit={doLogin}>
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