import React from 'react'

const BlogForm = ({ doCreateBlog, doCancelCreateBlog }) => {

  const handleAddBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    doCreateBlog(newBlog)
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
        <button id="cancelbutton" type="button" onClick={doCancelCreateBlog}>Cancel</button>
      </div>
    </form>)
}

export default BlogForm