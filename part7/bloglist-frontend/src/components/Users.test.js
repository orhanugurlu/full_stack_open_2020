import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import Users from './Users'

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
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    comments: ['comment5', 'comment6']
  },
]

const testUsers = [
  {
    id: '1234567890',
    username: 'orhanugurlu',
    name: 'Orhan Ugurlu',
    password: 'fullstack2020',
    blogs: [testBlogs[0], testBlogs[1]]
  },
  {
    id: '987654321',
    username: 'zehraugurlu',
    name: 'Zehra Ugurlu',
    password: 'fullstack2020',
    blogs: [testBlogs[2]]
  }
]

test('renders content', () => {
  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <Users users={testUsers} />
    </Router>
  )

  const contentDiv = component.container.querySelector('.content')

  expect(contentDiv).toHaveTextContent(testUsers[0].name)
  const row = component.getByText(testUsers[0].name).closest('tr')
  expect(row).toHaveTextContent('Blogs: 2')

  expect(contentDiv).toHaveTextContent(testUsers[1].name)
  const row2 = component.getByText(testUsers[1].name).closest('tr')
  expect(row2).toHaveTextContent('Blogs: 1')
})

test('clicking blog title navigates to blog page', () => {
  const history = createMemoryHistory()
  history.push = jest.fn()
  const component = render(
    <Router history={history}>
      <Users users={testUsers} />
    </Router>
  )

  fireEvent.click(component.getByText(testUsers[0].name))
  expect(history.push.mock.calls.length).toBe(1)
  expect(history.push.mock.calls[0][0]).toBe('/users/' + testUsers[0].id)
})
