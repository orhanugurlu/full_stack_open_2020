import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import BlogForm from './BlogForm'

test('renders content', () => {
  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <BlogForm />
    </Router>
  )

  const contentDiv = component.container.querySelector('.content')
  expect(contentDiv).toHaveTextContent('Create Blog')
  expect(contentDiv).toHaveTextContent('Title')
  expect(contentDiv).toHaveTextContent('Author')
  expect(contentDiv).toHaveTextContent('URL')

  const titleInput = component.queryByLabelText('Title')
  expect(titleInput).not.toBeNull()
  const authorInput = component.queryByLabelText('Author')
  expect(authorInput).not.toBeNull()
  const urlInput = component.queryByLabelText('URL')
  expect(urlInput).not.toBeNull()

  const createButton = component.queryByText('Create', { selector: 'button' })
  expect(createButton).not.toBeNull()
  const cancelButton = component.queryByText('Cancel', { selector: 'button' })
  expect(cancelButton).not.toBeNull()
})

test('cancel button calls doCancelCreateBlog', () => {
  const doCancelCreateBlog = jest.fn()

  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <BlogForm doCancelCreateBlog={doCancelCreateBlog} />
    </Router>
  )

  const cancelButton = component.queryByText('Cancel', { selector: 'button' })
  fireEvent.click(cancelButton)
  expect(doCancelCreateBlog.mock.calls.length).toBe(1)
})

test('create button calls doCreateBlog with values entered to form', () => {
  const doCreateBlog = jest.fn()
  const title = 'Test Title'
  const author = 'Test Author'
  const url = 'Test URL'

  const history = createMemoryHistory()
  const component = render(
    <Router history={history}>
      <BlogForm doCreateBlog={doCreateBlog} />
    </Router>
  )

  const titleInput = component.queryByLabelText('Title')
  const authorInput = component.queryByLabelText('Author')
  const urlInput = component.queryByLabelText('URL')
  fireEvent.change(titleInput, { target: { value: title } })
  fireEvent.change(authorInput, { target: { value: author } })
  fireEvent.change(urlInput, { target: { value: url } })

  const createButton = component.queryByText('Create', { selector: 'button' })
  fireEvent.click(createButton)
  expect(doCreateBlog.mock.calls.length).toBe(1)
  expect(doCreateBlog.mock.calls[0][0].title).toBe(title)
  expect(doCreateBlog.mock.calls[0][0].author).toBe(author)
  expect(doCreateBlog.mock.calls[0][0].url).toBe(url)
})
