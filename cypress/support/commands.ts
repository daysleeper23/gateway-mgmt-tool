import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      mount(component: React.ReactNode, options?: any): Chainable;
      openEditGatewayForm(): Chainable;
    }
  }
}

Cypress.Commands.add("mount", (component, options) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(component, options);
});

Cypress.Commands.add("openEditGatewayForm", () => {
  cy.get('[data-testid="list-row-action-trigger"]').first().click();
  cy.wait(500);
  cy.get('[data-testid="list-row-action-dropdown"]').should("exist");
  cy.get('[data-testid="list-row-action-dropdown"]')
    .contains("Edit Gateway")
    .click();
  cy.wait(500);
  cy.get('[data-testid="form-edit"]').should("exist");
});
