**Description**

The rise of the internet and mobile devices has led to the growth of customer-to-customer (C2C) e-commerce platforms. C2C e-commerce refers to online transactions between individuals rather than between a business and a consumer. The objective of the proposed problem is to create a C2C e-commerce website that is easy to use and provides a safe and secure platform for users to buy and sell products. The main features of this website are:

- User Authentication and Authorization
- Cart Functionalities
- User Role Based Actions
- Placing, Cancelling and Delivering Orders

**Technologies used in each tier**

- Presentation Tier (Client): React

- Logic Tier (Server): Node.js and Express

- Data Tier (Database): PostgreSQL and Redis.

- Other Technologies: Git, Bitbucket, Docker, Postman, RedisInsight-V2, Postbird, Visual Studio Code

**Setup Steps**

- Client: Run **npm install**, **npm run start** in client directory

- Server: Install Docker then run **npm install**, **npm run pg-up**, **npm run redis-up** and **npm run start** in server directory

- Database: After postgres container has started create a DB with name <DB_NAME> then run **npm run create:db**

**Environment variable**

**Server**

DB_USER = <DB_USER>

DB_PASSWORD = <DB_PASSWORD>

DB_HOST = <DB_HOST>

DB_PORT = <DB_PORT>

DB_NAME = <DB_NAME>

NODE_ENV = <NODE_ENV>

SERVER_PORT = <SERVER_PORT>

DEV_BASE_URL = <DEV_BASE_URL>

REDIS_PORT = <REDIS_PORT>

REDIS_HOST = <REDIS_HOST>

REDIS_PASSWORD = <REDIS_PASSWORD>

SALT = <CRYPTO_SALT>

JWT_ACCESS_SECRET = <JWT_ACCESS_SECRET>

JWT_REFRESH_SECRET = <JWT_REFRESH_SECRET>

JWT_ACCESS_TIME = <JWT_ACCESS_TIME>

JWT_REFRESH_TIME = <JWT_REFRESH_TIME>

**Client**

REACT_APP_BASE_SERVER_URL_DEV = <REACT_APP_BASE_SERVER_URL_DEV>
