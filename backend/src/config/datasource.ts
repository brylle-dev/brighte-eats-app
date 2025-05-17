import { DataSource } from "typeorm";

import {
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  DB_NAME,
} from "../constants/env";
import { Lead } from "../entities/lead.entity";
import { User } from "../entities/user.entity";

const synchronize = process.env.NODE_ENV !== "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize,
  logging: true,
  entities: [Lead, User],
  subscribers: [],
  migrations: [],
});

export const connectToDatabase = async () => {
  await AppDataSource.initialize().catch((error) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  });
};
