describe('note app', function(){
  it('front page can be opened', function(){
    cy.visit('http://localhost:3000/')
    cy.contains('Note app')
    cy.contains('Note app, Prince Kalala 2024')
  })
})