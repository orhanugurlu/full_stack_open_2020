import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => {

  if (message === null || message.content === '') {
    return null
  }

  return (
    <Alert variant={message.msgClass === 'error' ? 'danger' : 'success'}>
      {message.content}
    </Alert>
  )
}

export default Notification