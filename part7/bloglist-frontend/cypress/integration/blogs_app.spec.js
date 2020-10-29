const testUser = {
  username: 'orhanugurlu',
  name: 'Orhan Ugurlu',
  password: 'password1',
}

const testUser2 = {
  username: 'zehraugurlu',
  name: 'Zehra Ugurlu',
  password: 'password2',
}

const testBlog1 = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
}

const testBlog2 = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
}

describe('Blog list app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', testUser)
    cy.request('POST', 'http://localhost:3001/api/users', testUser2)
    cy.visit('http://localhost:3000')
  })

  afterEach(() => {
    cy.window().then(window => window.localStorage.clear())
  })

  it('front page can be opened', function () {
    cy.contains('Blog List Application').should('be.visible')
    cy.contains('Welcome to blog application!').should('be.visible')
    cy.contains('a', 'Home').should('have.attr', 'href', '/').should('be.visible')
    cy.contains('a', 'Blogs').should('have.attr', 'href', '/blogs').should('be.visible')
    cy.contains('a', 'Users').should('have.attr', 'href', '/users').should('be.visible')
    cy.contains('a', 'Login').should('have.attr', 'href', '/login').should('be.visible')
  })

  it('create new blog is not possible when not logged in', function () {
    cy.contains('a', 'Blogs').click()
    cy.contains('button', 'Create new').should('not.be.visible')
  })

  describe('Blogs', function () {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password })
      cy.createBlog(testBlog1)
      cy.login({ username: testUser2.username, password: testUser2.password })
      cy.createBlog(testBlog2)
      cy.login({ username: testUser.username, password: testUser.password })
      cy.contains('a', 'Blogs').click()
    })

    it('blogs are listed', function () {
      cy.contains('Blogs').should('be.visible')
      cy.contains(testBlog1.title).should('be.visible')
      cy.contains(testBlog2.title).should('be.visible')
      cy.contains('button', 'Create new').should('be.visible')
    })

    it('clicked blog is displayed', function () {
      cy.contains(testBlog1.title).click()
      cy.contains(`Blog: '${testBlog1.title}' by '${testBlog1.author}'`).should('be.visible')
      cy.contains('0').should('be.visible')
      cy.contains(testBlog1.url).should('be.visible')
      cy.contains(testUser.name).should('be.visible')
    })

    it('clicking like button increases number of likes', function () {
      cy.contains(testBlog1.title).click()
      cy.get('button').contains('Like').click()
      cy.contains('1').should('be.visible')
      cy.get('button').contains('Like').click()
      cy.contains('2').should('be.visible')
    })

    it('clicking owner of blog displays user', function () {
      cy.contains(testBlog1.title).click()
      cy.get('a').contains(testUser.name).click()
      cy.contains(`User: ${testUser.name}`).should('be.visible')
      cy.contains(testBlog1.title).should('be.visible')
    })
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.contains('a', 'Login').click()
      cy.contains('Login to application').should('be.visible')
    })

    it('login form displayed', function () {
      cy.get('input[name="username"]').should('exist')
      cy.get('input[name="password"]').should('exist')
      cy.get('form').contains('Login').should('be.visible')
      cy.get('form').contains('Cancel').should('be.visible')
    })

    it('succeeds with correct credentials', function () {
      cy.get('input[name="username"]').type(testUser.username)
      cy.get('input[name="password"]').type(testUser.password)
      cy.get('form').contains('Login').click()
      cy.contains(`${testUser.name} logged in`).should('be.visible')
      cy.get('form').should('not.exist')
      cy.contains('Logout').should('be.visible')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type(testUser.username)
      cy.get('input[name="password"]').type(testUser.password + 'dummy')
      cy.get('form').contains('Login').click()
      cy.contains('Wrong credentials!').should('be.visible')
      cy.get('form').should('exist')
      cy.wait(5100)
      cy.contains('Wrong credentials!').should('not.be.visible')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password })
    })

    it('A blog can be created', function () {
      cy.contains('a', 'Blogs').click()
      cy.contains('button', 'Create new').click()
      cy.contains('Create Blog').should('be.visible')
      cy.contains('button', 'Cancel').click()
      cy.contains('Blogs').should('be.visible')
      cy.contains('button', 'Create new').click()
      cy.get('input[name="title"]').type('Test Title')
      cy.get('input[name="author"]').type('Test Author')
      cy.get('input[name="url"]').type('http://testurl.com')
      cy.get('form').contains('button', 'Create').click()
      cy.contains('A new blog \'Test Title\' by \'Test Author\' added').should('be.visible')
      cy.wait(5100)
      cy.contains('A new blog \'Test Title\' by \'Test Author\' added').should('not.be.visible')
      cy.root().find('tr').should('have.length', 1)
      cy.contains('tr', 'Test Title').should('be.visible')
    })

    it('Can logout', function () {
      cy.contains(`${testUser.name} logged in`).should('be.visible')
      cy.contains('Logout').click()
      cy.contains(`${testUser.name} logged in`).should('not.be.visible')
      cy.contains('Welcome to blog application!').should('be.visible')
    })
  })

  describe('Users', function () {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password })
      cy.createBlog(testBlog1)
      cy.login({ username: testUser2.username, password: testUser2.password })
      cy.createBlog(testBlog2)
      cy.login({ username: testUser.username, password: testUser.password })
      cy.contains('a', 'Users').click()
    })

    it('users are listed', function () {
      cy.contains('Users').should('be.visible')
      cy.contains(testUser.name).should('be.visible')
      cy.contains(testUser2.name).should('be.visible')
      cy.get('table').find('tr').its('length').should('eq', 2)
      cy.contains('td', 'Blogs: 1').should('be.visible')
    })

    it('clicked users blogs are displayed', function () {
      cy.contains('a', testUser.name).click()
      cy.contains(`User: ${testUser.name}`).should('be.visible')
      cy.contains(testBlog1.title).should('be.visible')
    })

    it('clicking blog title if used displays blog', function () {
      cy.contains('a', testUser.name).click()
      cy.contains('a', testBlog1.title).click()
      cy.contains(`Blog: '${testBlog1.title}' by '${testBlog1.author}'`).should('be.visible')
      cy.contains(testBlog1.url).should('be.visible')
      cy.contains(testUser.name).should('be.visible')
    })
  })

  describe('When logged in with existing blogs', function () {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password })
      cy.createBlog(testBlog1)
      cy.login({ username: testUser2.username, password: testUser2.password })
      cy.createBlog(testBlog2)
      cy.login({ username: testUser.username, password: testUser.password })
      cy.contains('a', 'Blogs').click()
    })

    it('Can delete own blog', function () {
      cy.contains('a', testBlog1.title).click()
      cy.contains('button', 'Delete').click()
      cy.contains(`Deleted '${testBlog1.title}' by '${testBlog1.author}'`).should('be.visible')
      cy.wait(5100)
      cy.contains(`Deleted '${testBlog1.title}' by '${testBlog1.author}'`).should('not.be.visible')
      cy.contains(testBlog1.title).should('not.be.visible')
    })

    it('Cannot delete others blog', function () {
      cy.contains('a', testBlog2.title).click()
      cy.contains('button', 'Delete').should('not.be.visible')
    })

    it('blogs are ordered by like', function () {
      cy.contains('a', testBlog1.title).click()
      cy.get('button').contains('Like').click()
      cy.contains('a', 'Blogs').click()
      cy.root().find('tr').first().contains(testBlog1.title)
      cy.contains('a', testBlog2.title).click()
      cy.get('button').contains('Like').click()
      cy.get('button').contains('Like').click()
      cy.contains('a', 'Blogs').click()
      cy.root().find('tr').first().contains(testBlog2.title)
    })
  })

  describe('When logged out with existing blogs', function () {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password })
      cy.createBlog(testBlog1)
      cy.contains('Logout').click()
    })

    it('Can comment on blog', function () {
      cy.contains('a', 'Blogs').click()
      cy.contains('a', testBlog1.title).click()
      cy.get('input[name="comment"]').type('comment 1')
      cy.get('form').contains('button', 'Add').click()
      cy.contains('comment 1').should('be.visible')
      cy.get('input[name="comment"]').clear().type('comment 2')
      cy.get('form').contains('button', 'Add').click()
      cy.contains('comment 2').should('be.visible')
    })
  })
})
