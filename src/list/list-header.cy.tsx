import ListHeader from './list-header'

describe('<ListHeader />', () => {
  it('renders', () => {
    cy.mount(<ListHeader />)
    cy.get('[data-testid="list-header"]').should('exist')
    cy.get('[data-testid="list-header"]').should('have.class', 'p-6 flex border-b gap-4 w-full hover:bg-secondary text-primary font-medium')
    cy.get('[data-testid="list-header"]').should('contain', 'Gateway ID')
    cy.get('[data-testid="list-header"]').should('contain', 'Description')
    cy.get('[data-testid="list-header"]').should('contain', 'Status')
    cy.get('[data-testid="list-header"]').should('contain', 'Model')
    cy.get('[data-testid="list-header"]').should('contain', 'Version')
  })
})