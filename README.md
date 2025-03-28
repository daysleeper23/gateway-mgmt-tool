![test](https://github.com/daysleeper23/gateway-mgmt-tool/actions/workflows/test.yml/badge.svg)

# Gateway Management Demo

This project implemented a user interface for viewing and editing gateways, using React and Typescript.

- The primary UI is a list/table view, with sorting & filtering functions.
- The secondary UI is a detail view that utilizes different visualizations to display the statistics of a gateway.

## Table of Contents

- [Getting Started](#getting-started)
- [Requirements](#requirements)
- [Frameworks](#frameworks)

## Getting Started

1. Clone the repository
2. Install dependencies

```bash
yarn install
```

3. Run the app

```bash
yarn dev
```

## Requirements

These are the user stories for this demo:

- As a user, I want to visualize the list of gateways in the network
- As a user, I want to filter by gateway status, model and version
- As a user, I want to order the gateway to list the gateway having most recently received a message
- As a user, I want to access a statistics page giving additional details about a given gateway from the listing
- As a user, I want to edit a given gateway. The listing should reflect the updated data for the given gateway

## Frameworks

- UI library: [shadcn](https://ui.shadcn.com/)
- Routing: [React Router](https://reactrouter.com/home)
- Testing: [Cypress](https://www.cypress.io/)
- Type-safety: [zod](https://zod.dev/)
- Form & form validation: [React Hook Form](https://react-hook-form.com/)
- Data table, sorting & filtering: [TanStack Table](https://tanstack.com/table/latest)
- Data visualization: [Recharts](https://recharts.org/en-US/)
- State management: [zustand](https://github.com/pmndrs/zustand)
