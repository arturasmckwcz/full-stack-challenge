import fixtures from './testFixtures.json';

describe('RoomCard', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3007', req => {
      req.reply({
        body: fixtures,
      });
    }).as('graphql');

    cy.visit('/');
    cy.wait('@graphql');
  });

  describe('lg viewport', () => {
    beforeEach(() => {
      cy.viewport(993, 1024);
    });

    it('should render room card flex-direction row', () => {
      cy.get('.room-card').should($element => {
        const flexDirection = Cypress.$($element).css('flex-direction');
        expect(flexDirection).to.equal('row');
      });
    });
  });
  describe('md viewport', () => {
    beforeEach(() => {
      cy.viewport(769, 1024);
    });

    it('should render room card flex-direction row', () => {
      cy.get('.room-card').should($element => {
        const flexDirection = Cypress.$($element).css('flex-direction');
        expect(flexDirection).to.equal('row');
      });
    });
  });
  describe('sm viewport', () => {
    beforeEach(() => {
      cy.viewport(767, 1024);
    });

    it('should render room card flex-direction column', () => {
      cy.get('.room-card').should($element => {
        const flexDirection = Cypress.$($element).css('flex-direction');
        expect(flexDirection).to.equal('column');
      });
    });

    it('should render room buttons flex-direction row', () => {
      cy.get('.room-buttons').should($element => {
        const flexDirection = Cypress.$($element).css('flex-direction');
        expect(flexDirection).to.equal('row');
      });
    });
  });
});
