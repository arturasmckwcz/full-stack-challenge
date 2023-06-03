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
      cy.get('.header').then(() => {
        cy.get('[data-testid="101"]').scrollIntoView({
          ensureScrollable: false,
        });
        cy.wait(1000); // a delay to allow the page to scroll
        cy.get('.header').should('not.be.visible');
      });

      cy.get('.rooms-header').should('be.visible');
    });
  });
});

export {};
