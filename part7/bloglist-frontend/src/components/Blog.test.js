import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import Blog from './Blog'

const testUser = {
  id: '1234567890',
  username: 'orhanugurlu',
  name: 'Orhan Ugurlu',
  password: 'fullstack2020',
}

const otherTestUser = {
  id: '2234567890',
  username: 'test',
  name: 'Test Test',
  password: 'test',
}

const testBlog = {
  id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: testUser,
  comments: ['comment1', 'comment2']
}

test('renders content', () => {
  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <Blog blog={testBlog} loggedUser={testUser} />
    </Router>
  )

  const contentDiv = component.container.querySelector('.content')
  expect(contentDiv).toBeDefined()
  expect(contentDiv).toHaveTextContent(testBlog.title)
  expect(contentDiv).toHaveTextContent(testBlog.author)
  expect(contentDiv).toHaveTextContent(testBlog.url)
  expect(contentDiv).toHaveTextContent(testBlog.user.name)
  expect(contentDiv).toHaveTextContent(testBlog.comments[0])
  expect(contentDiv).toHaveTextContent(testBlog.comments[1])
  const addButton = component.getByText('Add', { selector: 'button' })
  expect(addButton).toBeDefined()
})

test('empty blog renders null', () => {
  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <Blog blog={null} loggedUser={testUser} />
    </Router>
  )

  const contentDiv = component.container.querySelector('.content')
  expect(contentDiv).toBeNull()
})

test('clicking the like button causes handleUpdate to be called with like field increased blog', () => {
  const handleUpdate = jest.fn()

  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <Blog blog={testBlog} loggedUser={testUser} handleUpdate={handleUpdate} />
    </Router>
  )

  const likeButton = component.getByText('Like', { selector: 'button' })
  fireEvent.click(likeButton)
  expect(handleUpdate.mock.calls.length).toBe(1)
  expect(handleUpdate.mock.calls[0][0].likes).toBe(testBlog.likes + 1)
})

test('delete button is not shown if blog is not owned by logged user', () => {
  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <Blog blog={testBlog} loggedUser={otherTestUser} />
    </Router>
  )

  expect(component.container).not.toHaveTextContent('Delete')
})

test('clicking the delete button causes handleDelete to be called with blog', () => {
  const handleDelete = jest.fn()

  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <Blog blog={testBlog} loggedUser={testUser} handleDelete={handleDelete} />
    </Router>
  )

  const deleteButton = component.getByText('Delete', { selector: 'button' })
  fireEvent.click(deleteButton)
  expect(handleDelete.mock.calls.length).toBe(1)
  expect(handleDelete.mock.calls[0][0]).toBe(testBlog)
})

test('clicking the add button causes handleUpdate to be called with comment added blog', () => {
  const handleUpdate = jest.fn()

  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <Blog blog={testBlog} loggedUser={testUser} handleUpdate={handleUpdate} />
    </Router>
  )

  const addButton = component.getByText('Add', { selector: 'button' })
  const commentField = component.getByPlaceholderText('Comment text')
  fireEvent.change(commentField, { target: { value: 'comment3' } })
  fireEvent.click(addButton)
  expect(handleUpdate.mock.calls.length).toBe(1)
  expect(handleUpdate.mock.calls[0][0].comments.length).toBe(3)
  expect(handleUpdate.mock.calls[0][0].comments[2]).toBe('comment3')
})
