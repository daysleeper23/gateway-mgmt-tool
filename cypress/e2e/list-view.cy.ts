beforeEach(() => {
  cy.visit('/');
});

describe('List View - Rendering', () => {
  it('should render list view correctly', () => {
    cy.get('[data-testid="list-view"]').should('exist');
    cy.get('[data-testid="list-header"]').should('exist');
    cy.get('[data-testid="list-row"]').should('have.length', 38);
  })
})