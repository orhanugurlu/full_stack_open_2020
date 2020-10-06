import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Login from './components/Login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

const LOGGED_IN_USER_KEY = 'loggedInUser'

const App = () => {
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormToggleRef = useRef()

  const setBlogsSorted = (newBlogs) => {
    setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
  }

  const setMsg = (msg) => {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(LOGGED_IN_USER_KEY)
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
    }
    blogService.getAll().then(blogs =>
      setBlogsSorted(blogs)
    )
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      window.localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user))
    } else {
      blogService.setToken('')
      window.localStorage.removeItem(LOGGED_IN_USER_KEY)
    }
  }, [user])

  return (
    <div>
      <h1>Blog List Application</h1>
      <Notification message={message} />
      <Login user={user} setUser={setUser} setMessage={setMsg} />
      {user !== null &&
        <Togglable buttonLabel='New Blog' ref={blogFormToggleRef}>
          <BlogForm blogs={blogs} setBlogs={setBlogsSorted} setMessage={setMsg} toggleRef={blogFormToggleRef} />
        </Togglable>
      }
      <Blogs blogs={blogs} setBlogs={setBlogsSorted} setMessage={setMsg} user={user} />
    </div>
  )
}

export default App