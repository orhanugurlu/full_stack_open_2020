import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'

test('renders content', () => {
  const component = render(
    <LoginForm />
  )

  const contentDiv = component.container.querySelector('.content')
  expect(contentDiv).toHaveTextContent('Login to application')
  expect(contentDiv).toHaveTextContent('Username')
  expect(contentDiv).toHaveTextContent('Password')

  const userNameInput = component.queryByLabelText('Username')
  expect(userNameInput).not.toBeNull()
  const passwordInput = component.queryByLabelText('Password')
  expect(passwordInput).not.toBeNull()

  const loginButton = component.queryByText('Login', { selector: 'button' })
  expect(loginButton).not.toBeNull()
  const cancelButton = component.queryByText('Cancel', { selector: 'button' })
  expect(cancelButton).not.toBeNull()
})

test('cancel button calls handleCancel', () => {
  const handleCancel = jest.fn()

  const component = render(
    <LoginForm handleCancel={handleCancel} />
  )

  const cancelButton = component.queryByText('Cancel', { selector: 'button' })
  fireEvent.click(cancelButton)
  expect(handleCancel.mock.calls.length).toBe(1)
})

test('login button calls handleLogin with credentisl entered', () => {
  const handleLogin = jest.fn()
  const testUsername = 'Test User'
  const testPassword = 'testpassword'

  const component = render(
    <LoginForm handleLogin={handleLogin} />
  )

  const userNameInput = component.queryByLabelText('Username')
  const passwordInput = component.queryByLabelText('Password')
  fireEvent.change(userNameInput, { target: { value: testUsername } })
  fireEvent.change(passwordInput, { target: { value: testPassword } })

  const loginButton = component.queryByText('Login', { selector: 'button' })
  fireEvent.click(loginButton)
  expect(handleLogin.mock.calls.length).toBe(1)
  expect(handleLogin.mock.calls[0][0]).toBe(testUsername)
  expect(handleLogin.mock.calls[0][1]).toBe(testPassword)
})
