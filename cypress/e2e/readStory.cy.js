describe('App loads', () => {
  it('to the local development environment', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('UI loads correctly', () => {
  it('displaying 0 for the stories read', () => {
    cy.get('.header__content--style').should('contain', '0')
  })

  it('displaying "Thinking" for the title of the story', () => {
    cy.get('.conversation__title--style').should('contain', 'Thinking')
  })

  it('displaying "Waiting" for the content of the story', () => {
    cy.get('.conversation__content--style').should('contain', 'Waiting')
  })

  it('a button to read another paragraph', () => {
    cy.get('.conversation__nextPage--style').should('contain', 'Read More')
  })

  it('an input area for the user', () => {
    cy.get('textarea').should('have.class', 'thoughts__textarea--style');
  })

  it('a button to proceed to next part of the app', () => {
    cy.get('.thoughts__button--style').should('contain', 'NEXT')
  })
})