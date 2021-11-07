describe('authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3012/')
  })

  it('should see auth page', () => {
    cy.get('#AuthLoginPage').should('be.visible')
  })

  it('should see an error if the username is empty', () => {
    cy.get('#AuthLoginPage input').eq(0).should('be.visible')
    cy.get('#AuthLoginPage input').eq(1).should('be.visible')

    cy.get('#AuthLoginPage input').eq(0).clear()
    cy.contains('The username is invalid').should('be.visible')

    cy.get('#AuthLoginPage input').eq(1).clear()
    cy.contains('The password is required').should('be.visible')
  })

  it('should show an error if the credentials are incorrect', () => {
    // Arrange
    cy.intercept('/auth/login', { fixture: 'auth-error' })

    // Act
    cy.get('#AuthLoginPage input').eq(0).clear().type('invalid')
    cy.get('#AuthLoginPage input').eq(1).clear().type('invalid')
    cy.get('#AuthLoginPage button').click()

    // Assert
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('should login as admin if the credentials are correct', () => {
    // Arrange
    cy.intercept('/auth/login', { fixture: 'auth-admin' })
    cy.intercept('/api/v1/entries', { fixture: 'entries' })

    // Act
    cy.get('#AuthLoginPage input').eq(0).clear().type('admin')
    cy.get('#AuthLoginPage input').eq(1).clear().type('admin')
    cy.get('#AuthLoginPage button').click()

    // Assert
    cy.contains('Invalid credentials').should('not.exist')
    cy.contains('Diary').should('be.visible')
    cy.contains('Report').should('be.visible')
    cy.contains('Entries').should('be.visible')
    cy.contains('admin-pepe').should('be.visible')
  })

  it('should login as user if the credentials are correct', () => {
    // Arrange
    cy.intercept('/auth/login', { fixture: 'auth-user' })
    cy.intercept('/api/v1/entries', { fixture: 'entries' })

    // Act
    cy.get('#AuthLoginPage input').eq(0).clear().type('admin')
    cy.get('#AuthLoginPage input').eq(1).clear().type('admin')
    cy.get('#AuthLoginPage button').click()

    // Assert
    cy.contains('Invalid credentials').should('not.exist')
    cy.contains('Diary').should('be.visible')
    cy.contains('Report').should('not.exist')
    cy.contains('Entries').should('not.exist')
    cy.contains('user-juan').should('be.visible')
  })
})

export {}
