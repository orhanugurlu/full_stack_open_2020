import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Login from './components/Login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'

const LOGGED_USER_KEY = 'loggedUser'

const App = () => {
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_KEY)
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      window.localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user))
    } else {
      blogService.setToken('')
      window.localStorage.removeItem(LOGGED_USER_KEY)
    }
  }, [user])

  return (
    <div>
      <h1>Blog List Application</h1>
      <Notification message={message} />
      <Login user={user} setUser={setUser} setMessage={setMessage} />
      {user !== null && <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />}
      <Blogs blogs={blogs} />
    </div>
  )
}

export default App