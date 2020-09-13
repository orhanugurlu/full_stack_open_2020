const notificationReducer = (state = { content: '', msgTime: 0 }, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return { content: action.content, msgTime: action.msgTime }
    case 'CLEAR_NOTIFICATION':
      if (action.msgTime === state.msgTime) {
        return { content: '', msgTime: 0 }
      } else {
        return state
      }
    default:
      return state
  }
}

const delay = time => new Promise(res => setTimeout(res, time));

export const createNotification = (content, timeInSeconds) => {
  return async dispatch => {
    const msgTime = new Date().getTime()
    dispatch({
      type: 'NEW_NOTIFICATION',
      content,
      msgTime
    })
    await delay(timeInSeconds * 1000);
    dispatch({
      type: 'CLEAR_NOTIFICATION',
      msgTime
    })
  }
}

export default notificationReducer
