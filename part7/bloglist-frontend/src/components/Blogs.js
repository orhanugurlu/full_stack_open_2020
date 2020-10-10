import React from 'react'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs, loggedUser, handleCreate }) => {

  return (
    <div>
      <h2>Blogs</h2>
      {loggedUser && <button id='createBlog' onClick={handleCreate}>Create new</button>}
      {blogs.map(blog =>
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default Blogs
