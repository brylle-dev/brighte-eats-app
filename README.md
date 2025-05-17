# Brighte Eats

**Brighte Eats** is a simple GraphQL-based application that collects expressions of interest from customers for various services related to a new food product offering. Customers can register their details and select which services they’re interested in: Delivery, Pick-up, and Payment.

---

## 📦 Tech Stack

### Backend

- **Node.js** with **TypeScript**
- **GraphQL** using [type-graphql](https://github.com/MichalLytek/type-graphql) & [@apollo/server](https://www.apollographql.com/docs/apollo-server/)
- **TypeORM** for database access
- **PostgreSQL** relational database (via Docker Compose)
- **Jest** for unit testing

### Frontend (optional)

- **Vite** + **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **@apollo/client** for GraphQL queries/mutations

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- Docker & Docker Compose
- Git

### 1. Clone the repository

```bash
git clone https://github.com/<username>/brighte-eats.git
cd brighte-eats
```

### 2. Backend Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Start PostgreSQL with Docker Compose:

   ```bash
   docker-compose up -d
   ```

3. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Run database migrations (if using TypeORM CLI):

   ```bash
   npm run typeorm migration:run
   ```

5. Start the GraphQL server:

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:4000/graphql`.

### 3. Frontend Setup (Optional)

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:5173/`.

---

## 📝 Available Scripts

### Backend

- `npm run dev` — Run server in development mode with hot reload
- `npm run build` — Compile TypeScript
- `npm run test` — Run unit tests with Jest
- `npm run typeorm migration:run` — Apply database migrations

### Frontend

- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## 🧪 Testing

Backend tests are written with Jest. To run tests:

```bash
cd backend
npm run test
```

---

## 📁 Project Structure

```
├── backend/
│   ├── __tests__/
│   ├── src/
|   |   ├── config/
|   |   ├── constants/
│   │   ├── entities/
│   │   ├── resolvers/
│   │   ├── test-utils/
│   │   └── index.ts
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── graphql/
│   │   └── App.tsx
│   ├── index.html
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 📄 GraphQL Schema

```graphql
type Lead {
  id: ID!
  services: [ServiceType!]!
  user: User!
}

type LeadRecord {
  leads: [Lead!]!
  totalCount: Int!
}

type Mutation {
  registerLead(data: RegisterInput!): Lead!
}

type Query {
  getLeadByEmail(email: String!): Lead
  getLeadById(id: Float!): Lead
  leadList(skip: Int! = 0, take: Int! = 10): LeadRecord!
}

input RegisterInput {
  email: String!
  mobile: String!
  name: String!
  postcode: String!
  services: [ServiceType!]!
}

enum ServiceType {
  DELIVERY
  PAYMENT
  PICK_UP
}

type User {
  email: String!
  id: ID!
  mobile: String!
  name: String!
  postcode: String!
}
```

---

## 🔗 Useful Links

- [TypeORM Documentation](https://typeorm.io/)
- [Type-GraphQL Docs](https://typegraphql.com/)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)
- [Jest Documentation](https://jestjs.io/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://github.com/shadcn/ui)

---

## 📄 License

MIT © \[Brylle Japhet Duka]
