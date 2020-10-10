import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)
  const history = useHistory()

  const handleCreate = () => {
    history.push('/createBlog')
  }

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
