import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setMessage, toggleRef }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const updateBlogs = (blogs, message) => {
    setBlogs(blogs)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setMessage({ text: message, class: 'info' })
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService.create(newBlog)
      .then(createdBlog => {
        toggleRef.current.toggleVisibility()
        updateBlogs(blogs.concat(createdBlog),
          `A new blog '${createdBlog.title}' by '${createdBlog.author}' added`)
      })
      .catch(error => {
        setMessage({ text: `${error.response.data.error}`, class: 'error' })
      })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create Blog</h2>
      <div>
        Title: <input id="title" value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author: <input id="author" value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        URL: <input id="url" value={newUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <button id="createbutton" type="submit">Create</button>
      </div>
    </form>)
}

export default BlogForm