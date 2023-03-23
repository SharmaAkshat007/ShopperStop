export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BASE_SERVER_URL_DEV: string;
    }
  }
}
