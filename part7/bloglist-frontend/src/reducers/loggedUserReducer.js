import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const LOGGED_IN_USER_KEY = 'loggedInUser'

const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login({
        username, password,
      })
      blogService.setToken(loggedUser.token)
      window.localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(loggedUser))
      dispatch({
        type: 'LOGIN',
        data: loggedUser,
      })
    } catch (exception) {
      dispatch(createNotification('Wrong credentials!', 'error', 5))
    }
  }
}

export const logout = () => {
  blogService.setToken('')
  window.localStorage.removeItem(LOGGED_IN_USER_KEY)
  return {
    type: 'LOGOUT'
  }
}

export const initializeLoggedUser = () => {
  const loggedInUserJSON = window.localStorage.getItem(LOGGED_IN_USER_KEY)
  if (loggedInUserJSON) {
    const loggedInUser = JSON.parse(loggedInUserJSON)
    blogService.setToken(loggedInUser.token)
    return {
      type: 'LOGIN',
      data: loggedInUser,
    }
  } else {
    return {
      type: 'LOGOUT'
    }
  }
}

export default loggedUserReducer
