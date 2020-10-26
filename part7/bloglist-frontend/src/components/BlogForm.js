import React from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'

const BlogForm = ({ doCreateBlog, doCancelCreateBlog }) => {

  const handleAddBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.elements['title'].value,
      author: event.target.elements['author'].value,
      url: event.target.elements['url'].value
    }
    doCreateBlog(newBlog)
  }

  return (
    <div className="content">
      <h2>Create Blog</h2>
      <Form onSubmit={handleAddBlog}>
        <FormGroup>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control type="text" name="title" id="title" />
          <Form.Label htmlFor="author">Author</Form.Label>
          <Form.Control type="text" name="author" id="author" />
          <Form.Label htmlFor="url">URL</Form.Label>
          <Form.Control type="text" name="url" id="url" />
          <Button variant="primary" type="submit">Create</Button>
          <Button variant="secondary" type="button" onClick={doCancelCreateBlog}>Cancel</Button>
        </FormGroup>
      </Form>
    </div>)
}

export default BlogForm