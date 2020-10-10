import React, { useEffect } from 'react'
import Home from './components/Home'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoggedUser from './components/LoggedUser'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeLoggedUser } from './reducers/loggedUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

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

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link to="/" style={padding}>Home</Link>
        <Link to="/blogs" style={padding}>Blogs</Link>
        <Link to="/users" style={padding}>Users</Link>
        {loggedUser !== null
          ? <LoggedUser />
          : <Link to="/login" style={padding}>Login</Link>
        }
      </div>
      <Notification />
      <h1>Blog List Application</h1>
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={requestedBlog} />
        </Route>
        <Route path="/createBlog">
          <BlogForm />
        </Route>
        <Route path="/blogs">
          <Blogs />
        </Route>
        <Route path="/users/:id">
          <User user={requestedUser} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/login">
          {loggedUser ? <Redirect to="/" /> : <LoginForm />}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <div>
        <br />
        FullStack 2020 Exercise application by Orhan Ugurlu
      </div>
    </div>
  )
}

export default App