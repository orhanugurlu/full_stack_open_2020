import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setMessage, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (id) => {
    const blogLiked = blogs.find(b => b.id === id)
    blogService.update({
      id: blogLiked.id,
      user: blogLiked.user.user,
      url: blogLiked.url,
      title: blogLiked.title,
      author: blogLiked.author,
      likes: blogLiked.likes + 1
    })
      .then(updatedBlog => {
        let newBlogs = [...blogs]
        newBlogs[blogs.indexOf(blog)] = updatedBlog
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        setMessage({ text: `${error.response.data.error}`, class: 'error' })
      })
  }

  const handleDelete = (id) => {
    const blogToDelete = blogs.find(b => b.id === id)
    if (window.confirm(`Delete '${blogToDelete.title}' by '${blogToDelete.author}'?`)) {
      blogService
        .deleteIt(id).then(() => {
          setMessage({ text: `Deleted '${blogToDelete.title}' by '${blogToDelete.author}'`, class: 'info' })
          setBlogs(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))
        })
        .catch(error => {
          setMessage({ text: `${error.response.data.error}`, class: 'error' })
        })
    }
  }

  return (
    <div className='blog'>
      <div>
        &apos;{blog.title}&apos; by &apos;{blog.author}&apos;
        <button style={hideWhenVisible} onClick={toggleVisibility}>View</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
      </div>
      <div style={showWhenVisible}>Address: {blog.url}</div>
      <div style={showWhenVisible}>Likes: {blog.likes} <button onClick={() => handleLike(blog.id)}>Like</button></div>
      <div style={showWhenVisible}>Owner: {blog.user.name}</div>
      {user !== null && user.name === blog.user.name &&
        <div style={showWhenVisible}><button onClick={() => handleDelete(blog.id)}>Delete</button></div>
      }
    </div>
  )
}

export default Blog