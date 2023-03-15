import crypto from "crypto";
import dotenv from "dotenv";
import { PoolClient } from "pg";
dotenv.config();
const findUserQuery = `
  SELECT * 
  FROM users
  WHERE email = $1
`;

const saveUserQuery = `
  INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4)
`;

export class User {
  private id?: string;
  private first_name?: string;
  private last_name?: string;
  private email?: string;
  private password?: string;
  private role?: string;
  private salt: string;

  constructor({
    id,
    first_name,
    last_name,
    email,
    password,
    role,
  }: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
  }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.salt = process.env.SALT;
  }

  public get getId(): string {
    return this.id;
  }

  public get getFirstName(): string {
    return this.first_name;
  }

  public get getLastName(): string {
    return this.last_name;
  }
  public get getEmail(): string {
    return this.email;
  }
  public get getPassword(): string {
    return this.password;
  }

  public get getRole(): string {
    return this.role;
  }

  public async findUser(client: PoolClient): Promise<User> {
    const res = await client.query(findUserQuery, [this.email]);

    if (res.rowCount === 0) {
      return null;
    }
    return new User(res.rows[0]);
  }

  public hashPassword(): void {
    const hash = crypto
      .pbkdf2Sync(this.password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);

    this.password = hash;
  }

  public async save(client: PoolClient): Promise<void> {
    const res = await client.query(saveUserQuery, [
      this.first_name,
      this.last_name,
      this.email,
      this.password,
    ]);
  }

  public compare(hashedPassword: string): boolean {
    const hash: string = crypto
      .pbkdf2Sync(this.password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return hash === hashedPassword;
  }
}
