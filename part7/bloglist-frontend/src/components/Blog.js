import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import AddCommentForm from './AddCommentForm'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const history = useHistory()

  if (!blog) {
    return null
  }

  const handleLike = (blogToLike) => {
    dispatch(updateBlog({ ...blogToLike, likes: blogToLike.likes + 1 }))
  }

  const handleDelete = (blogToDelete) => {
    dispatch(deleteBlog(blogToDelete, history))
  }

  return (
    <div className='blog'>
      <div className='blogHeader'>
        &apos;{blog.title}&apos; by &apos;{blog.author}&apos;
      </div>
      <div className='blogAddress'>Address: {blog.url}</div>
      <div className='blogLikes'>Likes: {blog.likes} <button className="likebutton" onClick={() => handleLike(blog)}>Like</button></div>
      <div className='blogOwner'>Owner: <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></div>
      {loggedUser !== null && loggedUser.name === blog.user.name &&
        <div><button className="deletebutton" onClick={() => handleDelete(blog)}>Delete</button></div>
      }
      <div className='commentsHeader'>Comments</div>
      <AddCommentForm blog={blog} />
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