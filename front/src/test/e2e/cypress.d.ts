declare namespace Cypress {
  interface Chainable<Subject> {
    invisibleInViewport(selector: string): Chainable<Subject>;
  }
}
