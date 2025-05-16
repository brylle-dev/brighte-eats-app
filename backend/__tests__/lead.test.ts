import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { graphql } from "graphql";
import { AppDataSource, connectToDatabase } from "../src/config/datasource";
import { LeadResolver } from "../src/graphql/resolvers/lead.resolver";

beforeAll(async () => {
  await connectToDatabase();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Lead API", () => {
  it("registers a lead", async () => {
    const schema = await buildSchema({ resolvers: [LeadResolver] });

    const query = `
    mutation {
        registerLead(data: {
        name: "Test User",
        email: "test@example.com",
        mobile: "0400000000",
        postcode: "2000",
        services: [DELIVERY, PAYMENT]
        }) {
        id
        name
        email
        services
        }
    }
`;

    const result = await graphql({ schema, source: query });
    expect(result.errors).toBeUndefined();
    expect(result.data).toBeDefined();
    const registerLead = (result.data as any).registerLead;
    expect(registerLead).toBeDefined();
    expect(registerLead.name).toBe("Test User");
  });
});
