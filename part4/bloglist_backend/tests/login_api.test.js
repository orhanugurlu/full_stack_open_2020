const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const config = require('../utils/config')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeAll(async () => {
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
})

describe('when test user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.testUser.password, 10)
    const user = new User({
      username: helper.testUser.username,
      name: helper.testUser.name,
      passwordHash: passwordHash
    })

    await user.save()
  })

  test('login succeeds with correct password', async () => {
    const credentials = {
      username: helper.testUser.username,
      password: helper.testUser.password
    }
    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    expect(response.body.username).toBe(helper.testUser.username)
    expect(response.body.name).toBe(helper.testUser.name)
  })

  test('login fails with wrong password', async () => {
    const credentials = {
      username: helper.testUser.username,
      password: 'wrongpassword'
    }
    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('invalid username or password')
  })

  test('login fails with wrong user', async () => {
    const credentials = {
      username: 'wronguser',
      password: 'wrongpassword'
    }
    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('invalid username or password')
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})