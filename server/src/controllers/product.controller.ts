import { Request, Response, NextFunction } from "express";
import Error from "../types/error";
import { productValidation } from "../utils/productValidator";
import joi from "joi";
import UserRequest from "../interfaces/request.interface";
import { Product } from "../models/product.model";
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
import { PoolClient } from "pg";
import pool from "../db/config";
import { ProductSeller } from "../models/product.model";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let client: PoolClient;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result: Array<ProductSeller> = await Product.getAllProducts(client);

    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "All products fetched",
      data: result,
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const getMyProducts = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  let client: PoolClient;
  try {
    client = await pool.connect();

    await client.query("BEGIN");
    const id: string = req.user_data.id;

    const result: Array<Product> = await Product.getMyProduct(id, client);
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "All products fetched",
      data: result,
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const addProduct = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const data = JSON.parse(req.body.data);
  const image = req.file;
  const result: joi.ValidationResult<any> = productValidation(data);
  if (result.error) {
    const messages: Array<string> = result.error.details.map(
      (detail) => detail.message
    );
    const err: Error = new Error(400, messages[0]);
    await unlinkAsync(image.path);
    return next(err);
  }
  if (data.role === "buyer") {
    await unlinkAsync(image.path);
    return next(new Error(400, "You cannot add a product"));
  }

  const user_id = req.user_data.id;

  const productInfo = {
    id: "" as string,
    name: data.name as string,
    description: data.description as string,
    quantity: data.quantity as number,
    price: data.price as number,
    user_id: user_id as string,
    image_name: image.filename,
    image_path: image.path,
    mimetype: image.mimetype,
    size: image.size,
  };

  const product: Product = new Product(productInfo);
  let client: PoolClient;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const output = await product.save(client);
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Product added",
      data: [
        {
          product,
        },
      ],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    await unlinkAsync(image.path);
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const updateProduct = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const result: joi.ValidationResult<any> = productValidation(req.body);
  if (result.error) {
    const messages: Array<string> = result.error.details.map(
      (detail) => detail.message
    );
    const err: Error = new Error(400, messages[0]);
    return next(err);
  }
  const product: Product = new Product(req.body);
  const productId = req.params.id;
  const userId = req.user_data.id;

  let client: PoolClient;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const userIdDB: string = await product.update(productId, client);
    if (userIdDB !== userId) {
      await client.query("ROLLBACK");
      return next(new Error(400, "You have not created this product"));
    }
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Product updated successfully",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};
export const updateProductImage = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const image: Express.Multer.File = req.file;
  const productId = req.params.id;
  const userId = req.user_data.id;

  let client: PoolClient;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result: Product = await Product.getProduct(productId, client);
    const userIdDB: string = await Product.updateImage(
      productId,
      image,
      client
    );
    if (userIdDB !== userId) {
      await unlinkAsync(req.file.path);
      await client.query("ROLLBACK");
      return next(new Error(400, "You have not created this product"));
    }
    await client.query("COMMIT");
    await unlinkAsync(result.getImagePath);
    return res.status(200).json({
      error: false,
      message: "Product Image updated successfully",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};
export const deleteProduct = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const productId: string = req.params.id;
  const userId = req.user_data.id;
  let client: PoolClient;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result: Product = await Product.getProduct(productId, client);
    const userIdDB: string = await Product.delete(productId, client);
    if (userId !== userIdDB) {
      await client.query("ROLLBACK");
      return next(new Error(400, "You have not created this product"));
    }
    await client.query("COMMIT");
    await unlinkAsync(result.getImagePath);
    return res.status(200).json({
      error: false,
      message: "Product deleted successfully",
      data: [],
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};
