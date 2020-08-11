const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const user = await User.findOne({})

  const blog = new Blog(request.body)
  blog.user = user._id
  const result = await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(result)
})

bloglistRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

bloglistRouter.put('/:id', async (request, response) => {
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
})

module.exports = bloglistRouter