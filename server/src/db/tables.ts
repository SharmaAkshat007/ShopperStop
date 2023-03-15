import pool from "./config";
import Logger from "../utils/logger";
const query: string = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS addresses(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  pin_code VARCHAR(255) NOT NULL,
  mobile_no VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  quantity INT NOT NULL,
  price INT NOT NULL,
  user_id UUID NOT NULL,
  image_name TEXT UNIQUE NOT NULL,
  image_path TEXT NOT NULL,
  mimetype TEXT NOT NULL,
  size BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS cart_products(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL,
  address_id UUID NOT NULL UNIQUE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_products(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  status BOOLEAN NOT NULL,
  product_id UUID NOT NULL,
  order_id UUID NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
`;

export const createTables = async (): Promise<any> => {
  try {
    const client = await pool.connect();
    client
      .query(query)
      .then((res: any): any => {
        Logger.info(res);
      })
      .catch((err: any): any => {
        Logger.error(err);
      })
      .then((): any => {
        client.release();
      });
  } catch (err: any) {
    Logger.error(err);
  }
};

import "make-runnable";
