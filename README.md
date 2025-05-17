### Features

- **Relational Database**: PostgreSQL with TypeORM
- **GraphQL API**: TypeGraphQL & Apollo Server on Node.js (TypeScript)
- **Entities**:
  - `User`: stores name, email, mobile, postcode
  - `Lead`: stores interest in services, linked to a `User`
- **Mutation**:
  - `registerLead(userInput, services: [Service]): Lead`
- **Queries**:
  - `leads`: list all leads
  - `lead(id)`: fetch single lead by ID
  - `leadByEmail(email)`: fetch single lead by email
- **Services Enum**: `delivery`, `pick_up`, `payment`
- **Unit Tests**: Jest

---

### 📁 Repository Structure

```
├── README.md
├── .env.example
├── package.json
├── tsconfig.json
├── ormconfig.ts
├── jest.config.js
├── src
│   ├── entity
│   │   ├── Lead.ts
│   │   └── User.ts
│   ├── resolvers
│   │   ├── LeadResolver.ts
│   │   └── RegisterLeadArgs.ts
│   └── index.ts
└── tests
    └── LeadResolver.test.ts
```

---

### 🛠️ Setup

1. **Clone & install**

   ```bash
   git clone https://github.com/your-org/brighte-eats-app.git
   cd brighte-eats-api
   npm install
   ```

2. **Configure**

   ```bash
   cp .env.example .env
   # Edit .env with your DB credentials
   ```

3. **Run**

   ```bash
   npm run start
   ```

4. **Test**
   ```bash
   npm run test
   ```
