import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ blogs, setBlogs, setMessage, user }) => {

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
        newBlogs[blogs.indexOf(blogLiked)] = updatedBlog
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
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete} />
      )}
    </div>
  )
}

export default Blogs
