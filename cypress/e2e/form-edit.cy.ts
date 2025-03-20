beforeEach(() => {
  cy.visit("/");
});

describe("Form Edit - Rendering", () => {
  it("should render form edit correctly", () => {
    cy.get('[data-testid="list-row-action-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="list-row-action-dropdown"]').should("exist");
    cy.get('[data-testid="list-row-action-dropdown"]').contains("Edit Gateway").click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");
    cy.get('[data-testid="form-edit"]').should("contain", "Edit Gateway");
    cy.get('[data-testid="form-edit"]').should("contain", "Description");
    cy.get('[data-testid="form-edit-submit"]').should("exist");
  });
});

describe("Form Edit - Submit", () => {
  it("should submit form edit correctly", () => {
    cy.get('[data-testid="list-row-action-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="list-row-action-dropdown"]').should("exist");
    cy.get('[data-testid="list-row-action-dropdown"]').contains("Edit Gateway").click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");
    cy.get('[data-testid="form-edit-description"]').type("Test Description");
    cy.get('[data-testid="form-edit-submit"]').click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("not.exist");
    cy.get('[data-testid="list-row"]').first().should("contain", "Test Description");
  });

  it("should not submit form edit with empty description", () => {
    cy.get('[data-testid="list-row-action-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="list-row-action-dropdown"]').should("exist");
    cy.get('[data-testid="list-row-action-dropdown"]').contains("Edit Gateway").click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");
    cy.get('[data-testid="form-edit-description"]').type("{backspace}");
    cy.get('[data-testid="form-edit-submit"]').click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");
    cy.get('[data-testid="form-edit"]').should("contain", "Description cannot be empty.");
  });
});