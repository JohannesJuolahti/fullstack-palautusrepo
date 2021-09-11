
describe('Blog ', function() {
  const loginPage = 'http://localhost:3000'

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ name: 'Testi Testaaja', username: 'testitestaaja', password: 'salainen' })
    cy.visit(loginPage)
  })

  it('Login form is shown', function() {
    cy.visit(loginPage)
    cy.contains('Log in to the application!')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testitestaaja')
      cy.get('#password').type('salainen')
      cy.get('#login').click()
      cy.contains('Testi Testaaja logged in.')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('falseUsername')
      cy.get('#password').type('wrongPassword')
      cy.get('#login').click()
      cy.contains('Wrong username or password.')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testitestaaja', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.get('#act').click()
      cy.get('#title').type('Testitestaaja kirjoittaa.')
      cy.get('#author').type('Testitestaaja.')
      cy.get('#url').type('www.testitestaaja.com')
      cy.get('#createBlog').click()
      cy.get('#blogInformation')
      cy.contains('Testitestaaja kirjoittaa.')
      cy.contains('Testitestaaja.')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'Blog for likes', author: 'Likey likey', url:'www.likes.com' })
      cy.get('#viewButton').click()
      cy.contains('www.likes.com').parent().find('button').as('likeButton')
      cy.get('@likeButton').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be removed', function() {
      cy.createBlog({ title: 'Blog for likes', author: 'Likey likey', url:'www.likes.com' })
      cy.get('#viewButton').click()
      cy.get('#removeButton').click()
    })

    it.only('A blog can be removed', function() {
      cy.createBlogWithLikes({ title: 'Blog for likes', author: 'Likey likey', url:'www.likes.com', likes: 4 })
      cy.createBlogWithLikes({ title: 'Most Likes!', author: 'Likey likey', url:'www.likes.com', likes: 6 })
      cy.createBlogWithLikes({ title: 'Blog for likes', author: 'Likey likey', url:'www.likes.com', likes: 1 })
      cy.createBlogWithLikes({ title: 'Blog for likes', author: 'Likey likey', url:'www.likes.com', likes: 2 })
      let addedBlogs = [{}]
      cy.get('#biggestLikes')
      /*
      addedBlogs.push({ title: 'Blog for likes', author: 'Likey likey', url:'www.likes.com', likes: 4 })
      addedBlogs.push({ title: 'Most Likes!', author: 'Likey likey', url:'www.likes.com', likes: 6 })
      addedBlogs.push({ title: 'Blog for likes', author: 'Likey likey', url:'www.likes.com', likes: 1 })
      addedBlogs.push({ title: 'Blog for likes', author: 'Likey likey', url:'www.likes.com', likes: 2 })
      */
    })
  })
})