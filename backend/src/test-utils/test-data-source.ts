// src/config/test-datasource.ts
import { DataSource } from "typeorm";
import { Lead } from "../entities/lead.entity";
import "dotenv/config";

export const TestDataSource = new DataSource({
  type: "postgres",
  host: process.env.TEST_DB_HOST || "localhost",
  port: Number(process.env.TEST_DB_PORT) || 5432,
  username: process.env.TEST_DB_USER || "postgres",
  password: process.env.TEST_DB_PASS || "postgres",
  database: process.env.TEST_DB_NAME || "brighte_eats_test",
  synchronize: true,
  dropSchema: true, // Clear DB on each run
  entities: [Lead],
});
