import { ErrorMessages } from "../../src/data/mock/common";

beforeEach(() => {
  cy.visit("/");
});

describe("Form Edit - Rendering", () => {
  it("should render form edit correctly", () => {
    cy.get('[data-testid="list-row-action-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="list-row-action-dropdown"]').should("exist");
    cy.get('[data-testid="list-row-action-dropdown"]')
      .contains("Edit Gateway")
      .click();
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
    cy.get('[data-testid="list-row-action-dropdown"]')
      .contains("Edit Gateway")
      .click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");
    cy.get('[data-testid="form-edit-description"]').type("Test Description");

    cy.get('[data-testid="select-multiple-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="select-multiple-dropdown"]')
      .contains("Sink 6").click();
    cy.get('[data-testid="select-multiple-dropdown"]')
      .contains("Sink 7").click();
    cy.get('body').click(10, 10);
    cy.wait(500);
    cy.get('[data-testid="form-edit-submit"]').click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("not.exist");
    cy.get('[data-testid="list-row"]')
      .first()
      .should("contain", "Test Description")
      .should("contain", "4 nodes");
  });

  it("should not submit form edit with empty description", () => {
    cy.get('[data-testid="list-row-action-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="list-row-action-dropdown"]').should("exist");
    cy.get('[data-testid="list-row-action-dropdown"]')
      .contains("Edit Gateway")
      .click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");
    cy.get('[data-testid="form-edit-description"]').type("{backspace}");
    cy.get('[data-testid="form-edit-submit"]').click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");
    cy.get('[data-testid="form-edit"]').should(
      "contain",
      ErrorMessages.DESCRIPTION_EMPTY,
    );
  });

  it("should not submit form edit with less than 2 nodes", () => {
    cy.get('[data-testid="list-row-action-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="list-row-action-dropdown"]').should("exist");
    cy.get('[data-testid="list-row-action-dropdown"]')
      .contains("Edit Gateway")
      .click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");

    cy.get('[data-testid="select-multiple-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="select-multiple-dropdown"]')
      .contains("Sink 1").click();
    cy.get('body').click(10, 10);
    cy.wait(500);
    cy.get('[data-testid="form-edit-submit"]').click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");
    cy.get('[data-testid="form-edit"]').should(
      "contain",
      ErrorMessages.SINK_MINIMUM,
    );
  });

  it("should not submit form if user click on Canceled", () => {
    cy.get('[data-testid="list-row-action-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="list-row-action-dropdown"]').should("exist");
    cy.get('[data-testid="list-row-action-dropdown"]')
      .contains("Edit Gateway")
      .click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("exist");
    cy.get('[data-testid="form-edit-description"]').type("Test Description");

    cy.get('[data-testid="select-multiple-trigger"]').first().click();
    cy.wait(500);
    cy.get('[data-testid="select-multiple-dropdown"]')
      .contains("Sink 6").click();
    cy.get('[data-testid="select-multiple-dropdown"]')
      .contains("Sink 7").click();
    cy.get('body').click(10, 10);
    cy.wait(500);
    cy.get('[data-testid="form-edit-cancel"]').click();
    cy.wait(500);
    cy.get('[data-testid="form-edit"]').should("not.exist");
    cy.get('[data-testid="list-row"]')
      .first()
      .should("not.contain", "Test Description")
      .should("not.contain", "4 nodes")
      .should("contain", "2 nodes");
  });
});
