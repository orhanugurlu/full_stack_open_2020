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
    cy.contains('Blog List Application')
    cy.contains('Login to application')
    cy.get('#loginform')
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
    cy.contains('Blogs')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type(testUser.username)
      cy.get('input[name="Password"]').type(testUser.password)
      cy.get('#loginbutton').click()
      cy.contains(`${testUser.name} logged in`)
      cy.get('#loginform').should('not.exist')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type(testUser.username)
      cy.get('input[name="Password"]').type(testUser.password + 'dummy')
      cy.get('#loginbutton').click()
      cy.get('.error').contains('Wrong credentials!')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#loginform')
      cy.wait(3100)
      cy.get('.error').should('not.exist')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password })
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#createbutton').click()
      cy.get('.info').contains('A new blog \'Test Title\' by \'Test Author\' added')
      cy.get('.info').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.wait(3100)
      cy.get('.info').should('not.exist')
      cy.root().find('.blog').should('have.length', 1)
      cy.root().find('.blog').first().get('.blogHeader').contains('\'Test Title\' by \'Test Author\'')
      cy.root().find('.blog').first().get('.blogHeader').contains('\'Test Title\' by \'Test Author\'')
      cy.root().find('.blog').first().get('.viewbutton')
    })

    it('Can logout', function () {
      cy.get('#logoutbutton').click()
      cy.get('#loginform')
    })
  })

  describe.only('When logged in with existing blogs', function () {
    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password })
      cy.createBlog({ title: 'Test Title', author: 'Test Author', url: 'http://testurl.com' })
      cy.login({ username: testUser2.username, password: testUser2.password })
      cy.createBlog({ title: 'Other Title', author: 'Other Author', url: 'http://otherurl.com' })
      cy.login({ username: testUser.username, password: testUser.password })
    })

    it('A blog can be liked', function () {
      cy.root().find('.blog').first().find('.viewbutton').click()
      cy.root().find('.blog').first().find('.blogLikes').contains('0')
      cy.root().find('.blog').first().find('.likebutton').click()
      cy.root().find('.blog').first().find('.blogLikes').contains('1')
      cy.root().find('.blog').first().find('.likebutton').click()
      cy.root().find('.blog').first().find('.blogLikes').contains('2')
    })

    it('Can delete own blog', function () {
      cy.root().find('.blog').first().find('.viewbutton').click()
      cy.root().find('.blog').first().find('.deletebutton').click()
      cy.contains('Test Title').should('not.exist')
    })

    it('Cannot delete others blog', function () {
      cy.root().find('.blog').last().find('.viewbutton').click()
      cy.root().find('.blog').last().find('.deletebutton').should('not.exist')
    })

    it('blogs are ordered by like', function () {
      cy.root().find('.blog').first().find('.viewbutton').click()
      cy.root().find('.blog').first().find('.likebutton').click()
      cy.root().find('.blog').first().find('.blogLikes').contains('1')
      cy.root().find('.blog').first().find('.blogLikes')
      cy.root().find('.blog').last().find('.viewbutton').click()
      cy.root().find('.blog').last().find('.likebutton').click()
      cy.root().find('.blog').last().find('.blogLikes').contains('1')
      cy.root().find('.blog').last().find('.likebutton').click()
      cy.root().find('.blog').first().get('.blogHeader').contains('Other Title')
    })

  })
})