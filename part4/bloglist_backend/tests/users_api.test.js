const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const testFail = async (user, errorExpected) => {
  const usersAtStart = await helper.usersInDb()

  const result = await api
    .post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain(errorExpected)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
}

describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('mySecret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds for a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'orhanugurlu',
      name: 'Orhan Ugurlu',
      password: 'fullstack2020',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already exists', async () => {
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'superuser',
    }
    await testFail(newUser, '`username` to be unique')
  })

  test('after creation, all users are retrieved properly', async () => {
    const newUser = {
      username: 'orhanugurlu',
      name: 'Orhan Ugurlu',
      password: 'fullstack2020',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.map((user => user.username))).toContainEqual('root')
    expect(response.body.map((user => user.username))).toContainEqual('orhanugurlu')
  })

})

describe('when there is no user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('creation fails with proper statuscode and message if username empty', async () => {
    const newUser = {
      name: 'Superuser',
      password: 'superuser',
    }
    await testFail(newUser, '`username` is required')
  })

  test('creation fails with proper statuscode and message if username is short', async () => {
    const newUser = {
      username: 'or',
      name: 'Superuser',
      password: 'superuser',
    }
    await testFail(newUser, '`username` (`or`) is shorter than the minimum allowed length (3)')
  })

  test('creation fails with proper statuscode and message if password empty', async () => {
    const newUser = {
      username: 'superuser',
      name: 'Superuser',
    }
    await testFail(newUser, 'password missing')
  })

  test('creation fails with proper statuscode and message if password is short', async () => {
    const newUser = {
      username: 'superuser',
      name: 'Superuser',
      password: 'su',
    }
    await testFail(newUser, 'password should be at least 3 characters long')
  })


})

afterAll(() => {
  mongoose.connection.close()
})