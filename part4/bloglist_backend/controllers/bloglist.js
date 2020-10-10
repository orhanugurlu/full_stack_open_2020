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
  let result = await blog.save()
  await result.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()

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
    await User.updateOne({ _id: decodedToken.id }, { $pullAll: { blogs: [request.params.id] } })
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'only allowed to delete own blogs' })
  }
})

bloglistRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const body = request.body
  const blogModified = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, blogModified, { runValidators: true, new: true, context: 'query' }
  ).populate('user', { username: 1, name: 1, id: 1 })

  response.json(updatedBlog)
})

module.exports = bloglistRouter