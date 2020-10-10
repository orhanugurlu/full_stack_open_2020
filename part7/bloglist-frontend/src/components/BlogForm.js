import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleAddBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    dispatch(createBlog(newBlog, history))
  }

  const handleCancel = () => {
    history.push('/blogs')
  }

  return (
    <form onSubmit={handleAddBlog}>
      <h2>Create Blog</h2>
      <div>
        Title: <input name="title" />
      </div>
      <div>
        Author: <input name="author" />
      </div>
      <div>
        URL: <input name="url" />
      </div>
      <div>
        <button id="createbutton" type="submit">Create</button>
        <button id="cancelbutton" onClick={handleCancel}>Cancel</button>
      </div>
    </form>)
}

export default BlogForm