import { Pool } from "pg";
import dotenv from "dotenv";
import Logger from "../utils/logger";

dotenv.config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

pool.on("connect", (): any => {
  Logger.info("Database connected successfully!");
});

pool.on("error", (err: any): any => {
  Logger.error(err);
});

pool.on("acquire", (): any => {
  Logger.info("Client acquired successfully from pool");
});

pool.on("remove", (): any => {
  Logger.info("Client removed successfully!");
});

export default pool;
