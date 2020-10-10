const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return { content: action.content, msgTime: action.msgTime, msgClass: action.msgClass }
    case 'CLEAR_NOTIFICATION':
      if (state !== null && action.msgTime === state.msgTime) {
        return { content: '', msgTime: 0 }
      } else {
        return state
      }
    default:
      return state
  }
}

const delay = time => new Promise(res => setTimeout(res, time))

export const createNotification = (content, msgClass, timeInSeconds) => {
  return async dispatch => {
    const msgTime = new Date().getTime()
    dispatch({
      type: 'NEW_NOTIFICATION',
      content,
      msgTime,
      msgClass
    })
    await delay(timeInSeconds * 1000)
    dispatch({
      type: 'CLEAR_NOTIFICATION',
      msgTime
    })
  }
}

export default notificationReducer
