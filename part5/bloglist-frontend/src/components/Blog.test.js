import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { testBlogs } from './TestHelper'

const testUser = {
  id: '1234567890',
  username: 'orhanugurlu',
  name: 'Orhan Ugurlu',
  password: 'fullstack2020',
}

const testBlog = {
  id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: testUser,
}

test('renders content', () => {
  const component = render(
    <Blog blog={testBlog} user={testUser} />
  )

  const headerDiv = component.container.querySelector('.blogHeader')
  expect(headerDiv).toBeDefined()
  expect(headerDiv).toHaveTextContent(testBlog.title)
  expect(headerDiv).toHaveTextContent(testBlog.author)

  const hiddenDivsContentMap = { '.blogAddress': testBlog.url, '.blogLikes': testBlog.likes, '.blogOwner': testBlog.user.name }
  for (const [divClassName, content] of Object.entries(hiddenDivsContentMap)) {
    const div = component.container.querySelector(divClassName)
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(content)
    expect(div).toHaveStyle('display: none')
  }
})

test('clicking the view button makes blog details visible', () => {
  const component = render(
    <Blog blog={testBlog} user={testUser} />
  )

  const viewButton = component.getByRole('button', { name: 'View' })
  fireEvent.click(viewButton)

  const hiddenDivsContentMap = { '.blogAddress': testBlog.url, '.blogLikes': testBlog.likes, '.blogOwner': testBlog.user.name }
  for (const [divClassName, content] of Object.entries(hiddenDivsContentMap)) {
    const div = component.container.querySelector(divClassName)
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(content)
    expect(div).not.toHaveStyle('display: none')
  }
})

test('clicking the like button twice causes handled to be called twice', () => {
  const handleLike = jest.fn()

  const component = render(
    <Blog blog={testBlog} user={testUser} handleLike={handleLike} />
  )

  const viewButton = component.getByRole('button', { name: 'View' })
  fireEvent.click(viewButton)

  const likeButton = component.getByRole('button', { name: 'Like' })
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleLike.mock.calls).toHaveLength(2)
})

test('Check if handler of new blog form is called', () => {
  // Since it calls the service itself, not suitable for component testing
  // without mocking service
})