import { Response, NextFunction } from "express";
import UserRequest from "../interfaces/request.interface";
import joi from "joi";
import { cartValidation } from "../utils/cartValidator";
import Error from "../types/error";
import CartProduct from "../models/cartProduct.model";
import { PoolClient } from "pg";
import pool from "../db/config";

export const getAll = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const buyer_id: string = req.user_data.id;
  let client: PoolClient;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result = await CartProduct.getAll(client, buyer_id);
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "All cart products fetched",
      data: result,
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const addCart = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const result: joi.ValidationResult<any> = cartValidation(req.body);

  if (result.error) {
    const messages: Array<string> = result.error.details.map(
      (detail) => detail.message
    );
    const err: Error = new Error(400, messages[0]);
    return next(err);
  }
  req.body.buyer_id = req.user_data.id;
  const cartProduct: CartProduct = new CartProduct(req.body);

  let client: PoolClient;

  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const found: boolean = await cartProduct.find(client);
    if (found) {
      return next(new Error(400, "Product already exits in cart"));
    }
    const result: CartProduct = await cartProduct.save(client);
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Product added to cart",
      data: [result],
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const updateCart = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const result: joi.ValidationResult<any> = cartValidation(req.body);

  if (result.error) {
    const messages: Array<string> = result.error.details.map(
      (detail) => detail.message
    );
    const err: Error = new Error(400, messages[0]);
    return next(err);
  }
  req.body.buyer_id = req.user_data.id;
  const cartProduct: CartProduct = new CartProduct(req.body);

  let client: PoolClient;

  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result: boolean = await cartProduct.update(client);
    if (result === false) {
      return next(new Error(400, "You cannot update this cart"));
    }
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Quantity updated successfully",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const deleteCart = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  let client: PoolClient;
  const product_id = req.params.productId;
  const buyer_id = req.user_data.id;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result: boolean = await CartProduct.delete(
      client,
      product_id,
      buyer_id
    );
    if (result === false) {
      return next(new Error(400, "You cannot delete item from this cart"));
    }
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Product deleted from cart",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};
