const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(request.body)
  blog.user = user.toJSON().id.toString()
  const result = await blog.save()

  user.blogs = user.blogs.concat(blog.toJSON().id.toString())
  await user.save()

  response.status(201).json(result)
})

bloglistRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const user = await User.findById(decodedToken.id)
  if (blog.user.toString() === user.toJSON().id.toString()) {
    await Blog.findOneAndRemove(request.params.id)
    user.blogs = user.blogs.filter(id => id !== request.params.id)
    await user.save()
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'only allowed to delete own blogs' })
  }
})

bloglistRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const user = await User.findById(decodedToken.id)
  if (blog.user.toString() === user.id.toString()) {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, blog, { runValidators: true, new: true, context: 'query' }
    )
    response.json(updatedBlog)
  } else {
    response.status(401).json({ error: 'only allowed to update own blogs' })
  }
})

module.exports = bloglistRouter