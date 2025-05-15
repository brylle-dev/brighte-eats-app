import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PORT } from "./constants/env";
import { buildSchema, Query, Resolver } from "type-graphql";
import path from "path";
import { connectToDatabase } from "./config/datasource";

@Resolver()
class HelloWorldResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }
}

const boot = async () => {
  await connectToDatabase();
  console.log("Data Source has been initialized!");
  // build the GraphQL schema
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver],
    // Create 'schema.graphql' file with schema definition in current directory
    emitSchemaFile: path.resolve(__dirname, "graphql/schema.graphql"),
  });
  // Create Apollo Server instance
  const apolloServer = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: Number(PORT) },
  });

  console.log(`🚀 Server ready at: ${url}`);
};

boot().catch((error) => {
  console.error("Error starting server:", error);
});
