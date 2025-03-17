import ListRow from './list-row'

describe('<ListRow />', () => {
  beforeEach(() => {
    cy.fixture('gateways.json').as('gateways');
  });

  it('renders', function () {
    const gateway = this.gateways[0];
    cy.mount(<ListRow gatewayUuid={gateway.uuid} />);
    cy.get(`[data-testid="list-row"]`).should('exist');
    cy.get(`[data-testid="list-row"]`).should('have.class', 'p-6 flex border-b gap-4 w-full hover:bg-secondary text-primary/80 text-sm');
    cy.get(`[data-testid="list-row"]`).should('contain', gateway.gatewayId);
    cy.get(`[data-testid="list-row"]`).should('contain', gateway.description);
    cy.get(`[data-testid="list-row"]`).should('contain', gateway.status);
    cy.get(`[data-testid="list-row"]`).should('contain', gateway.model);
    cy.get(`[data-testid="list-row"]`).should('contain', gateway.version);
  });
})