import { isColorCloseToRGB } from '../helpers';
import fixtures from './testFixtures.json';

describe('Rooms', () => {
  beforeEach(() => {
    // cy.intercept('POST', `${Cypress.env('REACT_APP_API_URL')}`, req => {
    cy.intercept('POST', 'http://localhost:3007', req => {
      req.reply({
        body: fixtures,
      });
    }).as('graphql');

    cy.visit('/');
  });

  it('renders rooms header', () => {
    cy.get('.rooms-header').should('exist');
  });

  it('should intercept and handle the request', () => {
    cy.wait('@graphql').then(interception => {
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.response?.body).to.deep.equal({ ...fixtures });
    });

    cy.get('.room-card').should('have.length', 4);
  });

  it('renders header containing Rooms, Create New Room and Search', () => {
    cy.get('.rooms-in-rails').should('exist');
    cy.get('.create').should('exist');
    cy.get('.search').should('exist');
  });

  it('renders list of 2 rooms matching search input', () => {
    cy.get('input').type('end');
    cy.get('.room-card').should('have.length', 2);
  });

  it('renders booked room', () => {
    cy.get('[data-testid="TV-Room"]').within(() => {
      cy.contains('TV-Room')
        .siblings()
        .contains('booked')
        .should('be.visible')
        .contains('Desks')
        .should('not.exist');
    });

    cy.get('.room-booked.background-booked')
      .should('have.length', 1)
      .should($element => {
        const backgroundColor = Cypress.$($element).css('background-color');
        const isColorReddish = isColorCloseToRGB(
          { red: 255, green: 0, blue: 0 },
          backgroundColor,
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(isColorReddish).to.be.true;
      });
  });

  it('renders free room', () => {
    cy.get('[data-testid="Kicker Room"]').within(() => {
      cy.contains('Kicker Room')
        .siblings()
        .contains('free')
        .should('be.visible')
        .contains('Desks')
        .should('not.exist');
    });

    cy.get('.room-booked.background-free')
      .should('have.length', 1)
      .should($element => {
        const backgroundColor = Cypress.$($element).css('background-color');
        const isColorGreenish = isColorCloseToRGB(
          { red: 0, green: 255, blue: 0 },
          backgroundColor,
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(isColorGreenish).to.be.true;
      });
  });

  it('renders 2 rooms with desks', () => {
    cy.get('[data-testid="desks"]').should('have.length', 2);

    cy.get('[data-testid="101"]').within(() => {
      cy.contains('101')
        .siblings()
        .contains('Desks: 2')
        .should('be.visible')
        .contains('booked')
        .should('not.exist')
        .get('[data-testid="bookable"]')
        .should('not.exist');
    });

    cy.get('[data-testid="102"]').within(() => {
      cy.contains('102')
        .siblings()
        .contains('Desks: 16')
        .should('be.visible')
        .contains('booked')
        .should('not.exist')
        .get('[data-testid="bookable"]')
        .should('not.exist');
    });
  });
});
