describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the header and rooms components', () => {
    cy.get('.container').should('exist');
    cy.get('.header').should('exist');
    cy.get('.rooms-header').should('exist');
  });
});

export {};
