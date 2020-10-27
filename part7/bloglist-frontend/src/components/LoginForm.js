import React from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'

const LoginForm = ({ handleLogin, handleCancel }) => {

  const doLogin = (event) => {
    event.preventDefault()
    handleLogin(event.target.elements['username'].value, event.target.elements['password'].value)
  }

  return (
    <div className="content">
      <h2>Login to application</h2>
      <Form id="loginform" onSubmit={doLogin}>
        <FormGroup>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control type="text" name="username" id="username" />
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control type="password" name="password" id="password" />
          <Button variant="primary" type="submit">Login</Button>
          <Button variant="secondary" type="button" onClick={handleCancel}>Cancel</Button>
        </FormGroup>
      </Form>
    </div>
  )
}

export default LoginForm