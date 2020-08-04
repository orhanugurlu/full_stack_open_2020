const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes([helper.testBlogs[0]])).toBe(helper.testBlogs[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(helper.testBlogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.favoriteBlog([])).toBe(undefined)
  })

  test('when list has only one blog, equals to that', () => {
    expect(listHelper.favoriteBlog([helper.testBlogs[0]])).toEqual(helper.testBlogs[0])
  })

  test('from a bigger list is selected right', () => {
    expect(listHelper.favoriteBlog(helper.testBlogs)).toEqual(helper.testBlogs[2])
  })
})

describe('most blogs', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.mostBlogs([])).toBe(undefined)
  })

  test('when list has only one blog, equals to that', () => {
    expect(listHelper.mostBlogs([helper.testBlogs[0]])).toEqual({ author: 'Michael Chan', blogs: 1 })
  })

  test('from a bigger list is selected right', () => {
    expect(listHelper.mostBlogs(helper.testBlogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.mostLikes([])).toBe(undefined)
  })

  test('when list has only one blog, equals to that', () => {
    expect(listHelper.mostLikes([helper.testBlogs[2]])).toEqual({ author: 'Edsger W. Dijkstra', likes: 12 })
  })

  test('from a bigger list is selected right', () => {
    expect(listHelper.mostLikes(helper.testBlogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})