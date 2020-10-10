import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'

const AddCommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const handleAddComment = (event, blogToUpdate) => {
    event.preventDefault()
    dispatch(updateBlog({
      ...blogToUpdate,
      comments: [...blogToUpdate.comments, event.target.comment.value]
    }))
  }

  return (
    <form onSubmit={e => handleAddComment(e, blog)}>
      <div>
        <input name="comment" /> <button id="addcommentbutton" type="submit">Add Comment</button>
      </div>
    </form>)
}

export default AddCommentForm