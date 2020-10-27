import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import LoggedUser from './LoggedUser'

const testUser = {
  id: '1234567890',
  username: 'orhanugurlu',
  name: 'Orhan Ugurlu',
  password: 'fullstack2020',
}

test('renders content', () => {
  const component = render(
    <LoggedUser user={testUser} />
  )

  expect(component.container).toHaveTextContent(testUser.name)
  const logoutButton = component.queryByText('Logout', { selector: 'button' })
  expect(logoutButton).not.toBeNull()
})

test('clicking the logout button causes handleLogout to be called', () => {
  const handleLogout = jest.fn()

  const component = render(
    <LoggedUser user={testUser} handleLogout={handleLogout} />
  )

  const logoutButton = component.queryByText('Logout', { selector: 'button' })
  fireEvent.click(logoutButton)
  expect(handleLogout.mock.calls.length).toBe(1)
})
