describe('note app', function(){
  beforeEach(function(){
    cy.visit('http://localhost:3000/')
  })
  it('front page can be opened', function(){
    cy.contains('Note app')
    cy.contains('Note app, Prince Kalala 2024')
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('prince')
    cy.get('#password').type('12345')
    cy.get('#login-btn').click()

    cy.contains('jean logged in')
  })  
})
