# Brighte Eats API

A TypeScript GraphQL API to collect expressions of interest for Brighte Eats.

## Tech Stack

- Node.js
- TypeORM
- TypeGraphQL
- Apollo Server
- PostgreSQL
- Jest (for tests)

## Running Locally

1. `docker compose up -d`
2. `npm install`
3. `npm run dev`

Visit [http://localhost:4000](http://localhost:4000)

## Features

- `register`: Mutation to create a lead
- `leads`: Query to list all leads
- `lead`: Query to get a single lead

## Testing

```sh
npm run test
```
