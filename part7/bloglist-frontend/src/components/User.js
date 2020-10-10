import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div className='user'>
      <div>
        <strong>{user.name}</strong>
      </div>
      <div>
        Blogs
      </div>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        )}
      </ul>
    </div>
  )
}

export default User