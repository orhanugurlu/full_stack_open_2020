import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import User from './User'

const testBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    comments: ['comment1', 'comment2']
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    comments: ['comment3', 'comment4']
  }
]

const testUser = {
  id: '1234567890',
  username: 'orhanugurlu',
  name: 'Orhan Ugurlu',
  password: 'fullstack2020',
  blogs: testBlogs
}

test('renders content', () => {
  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <User user={testUser} />
    </Router>
  )

  const contentDiv = component.container.querySelector('.content')
  expect(contentDiv).toHaveTextContent(testUser.name)
  expect(contentDiv).toHaveTextContent(testUser.blogs[0].title)
  expect(contentDiv).toHaveTextContent(testUser.blogs[1].title)
})

test('clicking blog title navigates to blog page', () => {
  const history = createMemoryHistory()
  history.push = jest.fn()
  const component = render(
    <Router history={history}>
      <User user={testUser} />
    </Router>
  )

  fireEvent.click(component.getByText(testBlogs[0].title))
  expect(history.push.mock.calls.length).toBe(1)
  expect(history.push.mock.calls[0][0]).toBe('/blogs/' + testBlogs[0].id)
})
