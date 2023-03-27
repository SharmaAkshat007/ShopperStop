import * as redis from "redis";
import dotenv from "dotenv";
import Logger from "../utils/logger";
dotenv.config();

const redis_client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASSWORD,
});

redis_client.on("connect", (): any => {
  Logger.info("Redis client connected!");
});

redis_client.on("end", (): any => {
  Logger.info("Redis client removed!");
});

redis_client.on("error", (err: any): any => {
  Logger.error(err.message);
});

process.on("SIGINT", () => {
  redis_client.quit();
});

(async () => {
  await redis_client.connect().catch(() => {});
})();

export default redis_client;
