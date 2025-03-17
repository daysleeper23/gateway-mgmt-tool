import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount(component: React.ReactNode, options?: any): Chainable<any>;
    }
  }
}

Cypress.Commands.add("mount", (component, options) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(component, options);
});
