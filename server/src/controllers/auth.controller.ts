import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import redis from "../redis/config";
import { User } from "../models/user.model";
import { signUpValidation, loginValidation } from "../utils/userValidator";
import joi from "joi";
import Error from "../types/error";
import UserRequest from "../interfaces/request.interface";
import dotenv from "dotenv";
import pool from "../db/config";
import { PoolClient } from "pg";
dotenv.config();

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const result: joi.ValidationResult<any> = signUpValidation(req.body);

  if (result.error) {
    const messages: Array<string> = result.error.details.map(
      (detail) => detail.message
    );
    const err: Error = new Error(400, messages[0]);
    return next(err);
  }
  const user: User = new User(req.body);
  let client: PoolClient;
  try {
    client = await pool.connect();

    await client.query("BEGIN");

    const found: User = await user.findUser(client);

    if (found !== null) {
      const error: Error = new Error(400, "User already exists");

      return next(error);
    }

    user.hashPassword();

    await user.save(client);

    await client.query("COMMIT");

    return res.status(200).json({
      error: false,
      message: "User created successfully!",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    const error: Error = new Error(500, err);
    return next(error);
  } finally {
    client.release();
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const result: joi.ValidationResult<any> = loginValidation(req.body);
  if (result.error) {
    const messages: Array<string> = result.error.details.map(
      (detail) => detail.message
    );
    const err: Error = new Error(400, messages[0]);

    return next(err);
  }

  const user: User = new User(req.body);
  let client: PoolClient;
  try {
    client = await pool.connect();

    await client.query("BEGIN");

    const found: User = await user.findUser(client);

    if (found === null) {
      const error: Error = new Error(400, "User does not exists");

      return next(error);
    }

    const isEqual: boolean = user.compare(found.getPassword);

    if (!isEqual) {
      const error: Error = new Error(400, "Password does not match");
      return next(error);
    }

    const access_token: string = jwt.sign(
      { id: found.getId, role: user.getRole },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TIME,
      }
    );

    const refresh_token: string = await generateRefreshToken(
      found.getId,
      user.getRole
    );

    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Logged in!",
      data: [
        {
          firstName: found.getFirstName,
          lastName: found.getLastName,
          email: found.getEmail,
          access_token: access_token,
          refresh_token: refresh_token,
        },
      ],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    const error: Error = new Error(500, err);
    return next(error);
  } finally {
    client.release();
  }
};

const logout = async (req: UserRequest, res: Response, next: NextFunction) => {
  const user_id: string = req.user_data.id;
  const token: string = req.token;
  try {
    await redis.del(user_id);
    await redis.set("BL_" + user_id, token);
    return res.status(200).json({
      error: false,
      message: "Log out successful",
      data: [],
    });
  } catch (err) {
    return next(new Error(500, err));
  }
};

const getAccessToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id: string = req.user_data.id;
  const role: string = req.user_data.role;
  const access_token = jwt.sign(
    { id: user_id, role: role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TIME }
  );
  const refresh_token = await generateRefreshToken(user_id, role);

  return res.json({
    error: false,
    message: "success",
    data: [{ access_token, refresh_token }],
  });
};

async function generateRefreshToken(id: string, role: string): Promise<string> {
  const refresh_token: string = jwt.sign(
    { id: id, role: role },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TIME,
    }
  );

  await redis.set(id, refresh_token);

  return refresh_token;
}

export { signup, login, getAccessToken, logout };
