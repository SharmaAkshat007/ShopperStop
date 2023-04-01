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

SALT = <SALT>  
JWT_ACCESS_SECRET = <JWT_ACCESS_SECRET>  
JWT_REFRESH_SECRET = <JWT_REFRESH_SECRET>  
JWT_ACCESS_TIME = <JWT_ACCESS_TIME>  
JWT_REFRESH_TIME = <JWT_REFRESH_TIME>

**Client**

REACT_APP_BASE_SERVER_URL_DEV = <REACT_APP_BASE_SERVER_URL_DEV>
