import React from 'react'

const AddCommentForm = ({ blog, handleUpdateBlog }) => {

  const handleAddComment = (event, blogToUpdate) => {
    event.preventDefault()
    handleUpdateBlog({
      ...blogToUpdate,
      comments: [...blogToUpdate.comments, event.target.comment.value]
    })
  }

  return (
    <form onSubmit={e => handleAddComment(e, blog)}>
      <div>
        <input name="comment" /> <button id="addcommentbutton" type="submit">Add Comment</button>
      </div>
    </form>)
}

export default AddCommentForm