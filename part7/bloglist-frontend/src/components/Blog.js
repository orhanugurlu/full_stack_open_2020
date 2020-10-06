import React, { useState } from 'react'

const Blog = ({ blog, user, handleDelete, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      <div className='blogHeader'>
        &apos;{blog.title}&apos; by &apos;{blog.author}&apos;
        <button className="viewbutton" style={hideWhenVisible} onClick={toggleVisibility}>View</button>
        <button className="hidebutton" style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
      </div>
      <div className='blogAddress' style={showWhenVisible}>Address: {blog.url}</div>
      <div className='blogLikes' style={showWhenVisible}>Likes: {blog.likes} <button className="likebutton" onClick={() => handleLike(blog.id)}>Like</button></div>
      <div className='blogOwner' style={showWhenVisible}>Owner: {blog.user.name}</div>
      {user !== null && user.name === blog.user.name &&
        <div style={showWhenVisible}><button className="deletebutton" onClick={() => handleDelete(blog.id)}>Delete</button></div>
      }
    </div>
  )
}

export default Blog