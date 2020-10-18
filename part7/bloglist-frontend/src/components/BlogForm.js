import React from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'

const BlogForm = ({ doCreateBlog, doCancelCreateBlog }) => {

  const handleAddBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    doCreateBlog(newBlog)
  }

  return (
    <div className="content">
      <h2>Create Blog</h2>
      <Form onSubmit={handleAddBlog}>
        <FormGroup>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" />
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" />
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" name="url" />
          <Button variant="primary" type="submit">Create</Button>
          <Button variant="secondary" type="button" onClick={doCancelCreateBlog}>Cancel</Button>
        </FormGroup>
      </Form>
    </div>)
}

export default BlogForm