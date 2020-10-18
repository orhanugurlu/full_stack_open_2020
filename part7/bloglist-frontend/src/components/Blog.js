import React from 'react'
import { Button, ListGroup, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddCommentForm from './AddCommentForm'

const Blog = ({ blog, loggedUser, handleUpdate, handleDelete }) => {
  if (!blog) {
    return null
  }

  const doLike = (blogToLike) => {
    handleUpdate({ ...blogToLike, likes: blogToLike.likes + 1 })
  }

  const doDelete = (blogToDelete) => {
    handleDelete(blogToDelete)
  }

  return (
    <div className="content">
      <h2>
        Blog: &apos;{blog.title}&apos; by &apos;{blog.author}&apos;
      </h2>
      <Table>
        <tbody>
          <tr>
            <td>Address</td>
            <td>{blog.url}</td>
          </tr>
          <tr>
            <td>Likes</td>
            <td>{blog.likes} <Button className="likebutton" onClick={() => doLike(blog)}>Like</Button></td>
          </tr>
          <tr>
            <td>Owner</td>
            <td><Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></td>
          </tr>
        </tbody>
      </Table>
      {loggedUser !== null && loggedUser.name === blog.user.name &&
        <div><Button className="deletebutton" onClick={() => doDelete(blog)}>Delete</Button></div>
      }
      <h3>Comments</h3>
      <AddCommentForm blog={blog} handleUpdateBlog={handleUpdate} />
      <div className='comments'>
        <ListGroup>
          {blog.comments.map((comment, index) =>
            <ListGroup.Item key={index}>{comment}</ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </div>
  )
}

export default Blog