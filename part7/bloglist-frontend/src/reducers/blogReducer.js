import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'
import { addBlogToUser, removeBlogFromUser } from './userReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'UPDATE_BLOG':
      return state
        .map(blog => blog.id === action.data.id ? action.data : blog)
        .sort((a, b) => b.likes - a.likes)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'ADD_BLOG':
      return [...state, action.data].sort((a, b) => b.likes - a.likes)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
    } catch (exception) {
      dispatch({
        type: 'INIT_BLOGS',
        data: [],
      })
      dispatch(createNotification(`Cannot get blogs: ${exception.message}`, 'error', 5))
    }
  }
}

export const updateBlog = (updatedBlog) => {
  return async dispatch => {
    try {
      const updatedBlogFromServer = await blogService.update(updatedBlog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlogFromServer,
      })
    } catch (exception) {
      dispatch(createNotification(`Update failed: ${exception.message}`, 'error', 5))
    }
  }
}

export const deleteBlog = (blogToDelete, history) => {
  return async dispatch => {
    try {
      await blogService.deleteIt(blogToDelete.id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blogToDelete.id,
      })
      dispatch(removeBlogFromUser(blogToDelete))
      history.push('/blogs')
      dispatch(createNotification(`Deleted '${blogToDelete.title}' by '${blogToDelete.author}'`, 'info', 5))
    } catch (exception) {
      dispatch(createNotification(`Delete failed: ${exception.message}`, 'error', 5))
    }
  }
}

export const createBlog = (newBlog, history) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(newBlog)
      dispatch({
        type: 'ADD_BLOG',
        data: createdBlog,
      })
      dispatch(addBlogToUser(createdBlog))
      history.push('/blogs')
      dispatch(createNotification(`A new blog '${createdBlog.title}' by '${createdBlog.author}' added`, 'info', 5))
    } catch (exception) {
      dispatch(createNotification(`Create failed: ${exception.message}`, 'error', 5))
    }
  }
}

export default blogReducer
