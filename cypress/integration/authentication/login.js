/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  // https://on.cypress.io/interacting-with-elements

  it('gives an error for invalid login', () => {
    // https://on.cypress.io/type
    cy.get('[name=email').type('faker@gmail.com');
    cy.get('[name=password').type('123456').should('have.value', '123456');
    cy.get('form > .btn').click();
    cy.url().should('not.be.eq', 'http://localhost:3000/user/dashboard');
  });

  it('logins in for valid data', () => {
    // https://on.cypress.io/type
    cy.get('[name=email')
      .type('user1@gmail.com')
      .should('have.value', 'user1@gmail.com');
    cy.get('[name=password').type('123456').should('have.value', '123456');
    cy.get('form > .btn').click();
    cy.url().should('eq', 'http://localhost:3000/user/dashboard');
    cy.get('.top-nav-dropdown > svg').click();
    cy.get('[href="/logout"]').click();
  });
});
