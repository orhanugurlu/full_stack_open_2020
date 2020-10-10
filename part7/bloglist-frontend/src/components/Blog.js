import React from 'react'
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
    <div className='blog'>
      <div className='blogHeader'>
        &apos;{blog.title}&apos; by &apos;{blog.author}&apos;
      </div>
      <div className='blogAddress'>Address: {blog.url}</div>
      <div className='blogLikes'>Likes: {blog.likes} <button className="likebutton" onClick={() => doLike(blog)}>Like</button></div>
      <div className='blogOwner'>Owner: <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></div>
      {loggedUser !== null && loggedUser.name === blog.user.name &&
        <div><button className="deletebutton" onClick={() => doDelete(blog)}>Delete</button></div>
      }
      <div className='commentsHeader'>Comments</div>
      <AddCommentForm blog={blog} handleUpdateBlog={handleUpdate} />
      <div className='comments'>
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog