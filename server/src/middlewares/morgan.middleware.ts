import morgan, { StreamOptions } from "morgan";
import Logger from "../utils/logger";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const httpLogStream = fs.createWriteStream("logs/http.log", { flags: "a" });

const skip = () => {
  const env = process.env.NODE_ENV || "DEV";
  return env !== "DEV";
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream: httpLogStream, skip }
);

export default morganMiddleware;
