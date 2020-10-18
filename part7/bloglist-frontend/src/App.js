import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory
} from 'react-router-dom'
import Home from './components/Home'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import { login, logout } from './reducers/loggedUserReducer'
import {
  initializeBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeLoggedUser } from './reducers/loggedUserReducer'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedUser = useSelector(state => state.loggedUser)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const message = useSelector(state => state.notification)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeLoggedUser())
  }, [dispatch])

  const blogIdMatch = useRouteMatch('/blogs/:id')
  const requestedBlog = blogIdMatch
    ? blogs.find(blog => blog.id === blogIdMatch.params.id)
    : null

  const userIdMatch = useRouteMatch('/users/:id')
  const requestedUser = userIdMatch
    ? users.find(user => user.id === userIdMatch.params.id)
    : null

  const handleAddBlog = (newBlog) => {
    dispatch(createBlog(newBlog, history))
  }

  const goToBlogs = () => {
    history.push('/blogs')
  }

  const cancelForm = () => {
    history.goBack()
  }

  const handleCreate = () => {
    history.push('/createBlog')
  }

  const handleUpdate = (updatedBlog) => {
    dispatch(updateBlog(updatedBlog))
  }

  const handleDelete = (blogToDelete) => {
    dispatch(deleteBlog(blogToDelete, history))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = (username, password) => {
    dispatch(login(username, password))
  }

  return (
    <div className="container">
      <NavigationBar loggedUser={loggedUser} handleLogout={handleLogout} />
      <Notification message={message} />
      <h1>Blog List Application</h1>
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={requestedBlog}
            loggedUser={loggedUser}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete} />
        </Route>
        <Route path="/createBlog">
          <BlogForm doCreateBlog={handleAddBlog} doCancelCreateBlog={cancelForm} />
        </Route>
        <Route path="/blogs">
          <Blogs blogs={blogs} loggedUser={loggedUser} handleCreate={handleCreate} />
        </Route>
        <Route path="/users/:id">
          <User user={requestedUser} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/login">
          {loggedUser ? <Redirect to="/" /> : <LoginForm handleLogin={handleLogin} handleCancel={cancelForm} />}
        </Route>
        <Route path="/">
          <Home handleGoToBlogs={goToBlogs} />
        </Route>
      </Switch>
    </div>
  )
}

export default App