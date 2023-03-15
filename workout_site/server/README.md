# GraphQL Server-side

This project provides a server-side implementation of GraphQL for handling data queries and mutations.

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL

### Installation

1. Clone the repository and navigate to the project directory.
2. Run `npm install` to install the necessary dependencies.
3. Create a PostgreSQL database for the project.
4. Copy `.env.example` to `.env` and update the values with your PostgreSQL database credentials.
5. Run `npm run migrate` to create the necessary tables in your database.
6. Run `npm start` to start the server.

## Project Structure

The project is structured as follows:

- `src/index.ts` - The entry point for the server application.
- `src/schema.graphql` - The GraphQL schema for the project.
- `src/resolvers/*.ts` - The resolvers for each GraphQL type defined in the schema.
- `src/models/*.ts` - The models for interacting with the database.
- `migrations/*.ts` - The database migration scripts.

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)