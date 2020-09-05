const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const newNotification = content => {
  return {
    type: 'NEW_NOTIFICATION',
    content,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer
