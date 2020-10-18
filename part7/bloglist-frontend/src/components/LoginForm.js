import React from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'

const LoginForm = ({ handleLogin, handleCancel }) => {

  const doLogin = (event) => {
    event.preventDefault()
    handleLogin(event.target.username.value, event.target.password.value)
  }

  return (
    <div className="content">
      <h2>Login to application</h2>
      <Form id="loginform" onSubmit={doLogin}>
        <FormGroup>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" />
          <Button variant="primary" type="submit">Login</Button>
          <Button variant="secondary" type="button" onClick={handleCancel}>Cancel</Button>
        </FormGroup>
      </Form>
    </div>
  )
}

export default LoginForm