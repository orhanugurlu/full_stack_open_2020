import React from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'

const AddCommentForm = ({ blog, handleUpdateBlog }) => {

  const handleAddComment = (event, blogToUpdate) => {
    event.preventDefault()
    handleUpdateBlog({
      ...blogToUpdate,
      comments: [...blogToUpdate.comments, event.target.elements['comment'].value]
    })
  }

  return (
    <Form onSubmit={e => handleAddComment(e, blog)}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Comment text"
          aria-label="Comment text"
          aria-describedby="basic-addon2"
          name="comment"
        />
        <InputGroup.Append>
          <Button type="submit" variant="outline-secondary">Add</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>)
}

export default AddCommentForm