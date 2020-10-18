import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs, loggedUser, handleCreate }) => {

  return (
    <div className="content">
      <h2>Blogs</h2>
      {loggedUser && <Button id='createBlog' onClick={handleCreate}>Create new</Button>}
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
