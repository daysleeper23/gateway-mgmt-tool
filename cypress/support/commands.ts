import { mount } from "cypress/react";

declare global {
  namespace Cypress { // eslint-disable-line @typescript-eslint/no-namespace
    interface Chainable {
      mount(component: React.ReactNode, options?: any): Chainable; // eslint-disable-line @typescript-eslint/no-explicit-any
      openEditGatewayForm(): Chainable<void>;
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
