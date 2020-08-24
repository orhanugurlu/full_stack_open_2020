import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, setMessage, user }) => (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} user={user} />
    )}
  </div>
)

export default Blogs
