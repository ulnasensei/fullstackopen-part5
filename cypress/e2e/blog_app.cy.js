const userData = [
  {
    name: 'Cypress User',
    username: 'cypress',
    password: 'cypress123',
  },
  {
    name: 'Cypress User2',
    username: 'cypress2',
    password: 'cypress1234',
  },
]

const blogData = [
  {
    title: 'The title with the second most likes',
    author: 'mr. cypress',
    url: 'https://cypress.com',
    likes: 5,
  },
  {
    title: 'The title with the most likes',
    author: 'mr. cypress',
    url: 'https://cypress.com',
    likes: 100,
  },
]

describe('Blog app', function () {
  beforeEach(function () {
    cy.dbReset(userData)
    cy.visit('')
  })

  it('Front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('Login form is shown', function () {
    cy.get('#login-form').get('button').contains('Login')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.dbReset(userData)
      cy.visit('')
    })

    it('User can login', function () {
      cy.get('#username').type(userData[0].username)
      cy.get('#password').type(userData[0].password)
      cy.get('#login-btn').click()
      cy.contains(`${userData[0].name} logged in`)
    })

    it('Login fails with wrong password', function () {
      cy.get('#username').type(userData[0].username)
      cy.get('#password').type('wrongPassword123')
      cy.get('#login-btn').click()

      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.dbReset(userData)
      cy.login(userData[0])
    })
    it('A new blog can be created', function () {
      cy.get('#new-blog-toggle').click()
      cy.get('#title').type(blogData[0].title)
      cy.get('#author').type(blogData[0].author)
      cy.get('#url').type(blogData[0].url)
      cy.get('#submit-btn').click()

      cy.get('.blog').contains(blogData[0].title)
    })

    describe('Blog posts exist', function () {
      beforeEach(function () {
        cy.dbReset(userData)
        cy.login(userData[0])
        cy.createBlog(blogData)
      })
      it('User can like a blog post', function () {
        cy.get('.blog-toggle-btn').eq(1).click()
        cy.get('.blog-likes-btn').click()
        cy.get('.blog-likes').should(
          'contain',
          `likes ${blogData[0].likes + 1}`
        )
      })
      it('Owner can delete a post', function () {
        cy.get('.blog-toggle-btn').eq(0).click()
        cy.get('.blog-remove-btn').click()

        cy.should('not.contain', blogData[0].title)
      })
      it('Only owner can see the remove button', function () {
        cy.login(userData[1])
        cy.get('.blog-toggle-btn').eq(0).click()
        cy.get('.blog-remove-btn').should('not.exist')
      })
      it('Posts are in descending order by like count', function () {
        cy.get('.blog')
          .eq(0)
          .should('contain', 'The title with the most likes')
        cy.get('.blog')
          .eq(1)
          .should('contain', 'The title with the second most likes')
      })
    })
  })
})
