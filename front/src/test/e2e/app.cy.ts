describe('App', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3007').as('graphql');
    cy.viewport(1440, 667);
    cy.visit('/');
  });

  it('renders the header and rooms components', () => {
    cy.get('.container').should('exist');
    cy.get('.header').should('exist');
    cy.get('.rooms-header').should('exist');
  });

  it('should scroll up header while rooms list header should remain visible', () => {
    cy.wait('@graphql').then(() => {
      cy.get('[data-testid="102"]').scrollTo('top', {
        ensureScrollable: false,
      });
      cy.invisibleInViewport('.header');
      cy.get('.rooms-header').should('exist');
    });
  });
});

export {};
