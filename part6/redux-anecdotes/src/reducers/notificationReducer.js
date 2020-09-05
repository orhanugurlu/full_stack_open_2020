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

const delay = time => new Promise(res => setTimeout(res, time));

export const createNotification = (content, timeInSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      content,
    })
    await delay(timeInSeconds * 1000);
    dispatch({
      type: 'CLEAR_NOTIFICATION'
    })
  }
}

export default notificationReducer
