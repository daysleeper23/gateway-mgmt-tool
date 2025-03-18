beforeEach(() => {
  cy.visit("/");
});

describe("List View - Rendering", () => {
  it("should render list view correctly", () => {
    cy.get('[data-testid="list-view"]').should("exist");
    cy.get('[data-testid="list-header"]').should("exist");
    cy.get('[data-testid="list-row"]').should("have.length", 38);
    cy.get('[data-testid="list-filter-sort"]').should("exist");
    cy.get('[data-testid="list-sort-ts-checkbox"]').should("exist");
  });
});

describe("List View - Sorting", () => {
  it("should sort by last message timestamp when the checkbox is checked", () => {
    cy.get('[data-testid="list-sort-ts-checkbox"]').click();
    cy.wait(500);
    cy.get('[data-testid="list-row"]')
      .first()
      .should("contain", "2023-12-13, 12:19:56");
  });

  it("should sort by id when the checkbox is unchecked", () => {
    cy.get('[data-testid="list-sort-ts-checkbox"]').click();
    cy.wait(500);
    cy.get('[data-testid="list-sort-ts-checkbox"]').click();
    cy.get('[data-testid="list-row"]')
      .first()
      .should("contain", "gatewaySink11Sink12");
  });
});
