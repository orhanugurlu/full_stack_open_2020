import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Notification from './Notification'

test('renders content', () => {
  const testMsg = { content: 'Test Message' }
  const component = render(
    <Notification message={testMsg} />
  )

  expect(component.container).toHaveTextContent('Test Message')
})

test('null message renders null', () => {
  const component = render(
    <Notification message={null} />
  )

  const contentDiv = component.container.querySelector('.content')
  expect(contentDiv).toBeNull()
})

test('renders null if message content is empty', () => {
  const testMsg = { content: '' }
  const component = render(
    <Notification message={testMsg} />
  )

  const contentDiv = component.container.querySelector('.content')
  expect(contentDiv).toBeNull()
})
