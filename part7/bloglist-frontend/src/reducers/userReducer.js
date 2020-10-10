import userService from '../services/users'
import { createNotification } from './notificationReducer'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'ADD_BLOG_TO_USER':
      return state.map(user => user.id === action.data.user.id
        ? { ...user, blogs: [...user.blogs, action.data] }
        : user)
    case 'REMOVE_BLOG_FROM_USER':
      return state.map(user => user.id === action.data.user.id
        ? { ...user, blogs: user.blogs.filter(blog => blog.id !== action.data.id) }
        : user)
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const blogs = await userService.getAll()
      dispatch({
        type: 'INIT_USERS',
        data: blogs,
      })
    } catch (exception) {
      dispatch({
        type: 'INIT_USERS',
        data: [],
      })
      dispatch(createNotification(`Cannot get users: ${exception.message}`, 'error', 5))
    }
  }
}

export const addBlogToUser = (blog) => {
  return {
    type: 'ADD_BLOG_TO_USER',
    data: blog,
  }
}

export const removeBlogFromUser = (blog) => {
  return {
    type: 'REMOVE_BLOG_FROM_USER',
    data: blog,
  }
}

export default userReducer
