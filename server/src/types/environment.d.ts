export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      NODE_ENV: "DEV" | "TEST" | "PROD";
      SERVER_PORT: string;
      REDIS_PORT: string;
      REDIS_HOST: string;
      REDIS_PASSWORD: string;
      SALT: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_TIME: string;
      JWT_REFRESH_TIME: string;
    }
  }
}
