const login = () =>
  cy.session('admin', () => {
    cy.intercept('POST', '**/api/auth/login').as('login');

    cy.visit('/#/login');
    cy.get('input[type="email"]').type(Cypress.expose('ADMIN_EMAIL'));
    cy.get('input[type="password"]').type(Cypress.expose('ADMIN_PASSWORD'), { log: false });
    cy.get('button[type="submit"]').click();

    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.location('hash').should('eq', '#/');
    cy.window().its('localStorage.token').should('exist');
  });

describe('Admin Project CRUD Workflow', () => {
  beforeEach(() => {
    login();

    cy.intercept('GET', '**/api/projects').as('getProjects');
    cy.intercept('GET', '**/api/contacts').as('getContacts');

    cy.visit('/#/admin');
    cy.wait(['@getProjects', '@getContacts']);
    cy.contains('h1', 'Admin Dashboard').should('be.visible');
  });

  it('creates a new project and deletes it', () => {
    // CREATE
    cy.get('input[placeholder="Project Title"]').type('Cypress Test Project');
    cy.get('input[placeholder="Description"]').type('Created by automated E2E test.');
    cy.get('input[type="date"]').type('2026-01-01');

    cy.intercept('POST', '**/api/projects').as('createProject');
    cy.contains('button', /^create$/i).click();
    cy.wait('@createProject').its('response.statusCode').should('eq', 201);

    cy.contains('li', 'Cypress Test Project').should('be.visible');
    cy.screenshot('1-project-created');

    // DELETE
    cy.on('window:confirm', () => true);
    cy.intercept('DELETE', '**/api/projects/*').as('deleteProject');

    cy.contains('li', 'Cypress Test Project')
      .contains('button', /delete/i)
      .click();
    cy.wait('@deleteProject').its('response.statusCode').should('eq', 200);

    cy.contains('Cypress Test Project').should('not.exist');
    cy.screenshot('2-project-deleted');
  });
});
