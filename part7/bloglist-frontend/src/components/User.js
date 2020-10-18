import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div className="content">
      <h2>User: {user.name}</h2>
      <h3>Blogs</h3>
      <Table striped>
        <tbody>
          {user.blogs.map(blog =>
            <tr key={blog.id}><td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td></tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User