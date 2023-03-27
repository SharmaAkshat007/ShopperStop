import pool from "../db/config";
import { PoolClient } from "pg";
import UserRequest from "../interfaces/request.interface";
import { Response, NextFunction } from "express";
import addressValidation from "../utils/addressValidator";
import joi from "joi";
import Error from "../types/error";
import Address from "../models/address.model";

export const getAll = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  let client: PoolClient;
  const user_id = req.user_data.id;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result: Array<Address> = await Address.getAll(client, user_id);
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "All address fetched",
      data: result,
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const createAddress = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const result: joi.ValidationResult<any> = addressValidation(req.body);

  if (result.error) {
    const messages: Array<string> = result.error.details.map(
      (detail) => detail.message
    );
    const err: Error = new Error(400, messages[0]);
    return next(err);
  }

  const address: Address = new Address(req.body);
  const user_id = req.user_data.id;
  let client: PoolClient;

  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const data = await address.save(client, user_id);
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Address added succesfully",
      data: data,
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const updateAddress = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const result: joi.ValidationResult<any> = addressValidation(req.body);

  if (result.error) {
    const messages: Array<string> = result.error.details.map(
      (detail) => detail.message
    );
    const err: Error = new Error(400, messages[0]);
    return next(err);
  }

  req.body.id = req.params.addressId;
  req.body.user_id = req.user_data.id;

  const address: Address = new Address(req.body);

  let client: PoolClient;

  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result: boolean = await address.update(client);
    if (result === false) {
      return next(new Error(400, "You cannot update this address"));
    }
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Address updated successfully",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const deleteAddress = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id: string = req.user_data.id;
  const address_id: string = req.params.addressId;
  let client: PoolClient;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result: boolean = await Address.delete(client, user_id, address_id);
    if (result === false) {
      return next(new Error(400, "You cannot delete this address"));
    }
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Address deleted successfully",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};
