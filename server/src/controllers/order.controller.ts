import UserRequest from "../interfaces/request.interface";
import { Response, NextFunction } from "express";
import Order from "../models/order.model";
import { PoolClient } from "pg";
import Error from "../types/error";
import pool from "../db/config";
import CartProduct from "../models/cartProduct.model";
import OrderProduct from "../models/orderProduct.model";

export const getAll = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const buyer_id = req.user_data.id;

  let client: PoolClient;

  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const data: Array<any> = await Order.getAll(client, buyer_id);

    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "All order fetched",
      data: data,
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const createOrder = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const buyer_id: string = req.user_data.id;
  const address_id: string = req.body.address_id as string;
  const status: boolean = false;

  const order: Order = new Order({
    id: "",
    buyer_id: buyer_id,
    address_id: address_id,
    date: new Date(),
  });

  let client: PoolClient;

  try {
    client = await pool.connect();
    await client.query("BEGIN");

    const cartProducts: Array<CartProduct> = await CartProduct.findWithCartId(
      client,
      buyer_id
    );
    if (cartProducts === null) {
      return next(new Error(400, "No products in your cart"));
    }

    const orderId: string = await order.save(client);

    const orderProducts: Array<OrderProduct> = cartProducts.map(
      (cartProduct) =>
        new OrderProduct({
          id: "",
          status: status,
          product_id: cartProduct.getProductId,
          order_id: orderId,
          quantity: cartProduct.getQuantity,
        })
    );

    orderProducts.forEach(async (orderProduct) => {
      await orderProduct.save(client);
    });

    cartProducts.forEach(async (cartProduct) => {
      await CartProduct.delete(client, cartProduct.getProductId, buyer_id);
    });

    await client.query("COMMIT");

    return res.status(200).json({
      error: false,
      message: "Order created successfully",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const deleteOrder = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.params.orderId;
  const buyer_id = req.user_data.id;

  let client: PoolClient;
  try {
    client = await pool.connect();
    await client.query("BEGIN");

    const result: boolean = await Order.delete(client, orderId, buyer_id);
    if (result === null) {
      return next(new Error(400, "You cannot delete this order"));
    }
    if (result === false) {
      await client.query("ROLLBACK");
      return next(
        new Error(
          400,
          "Order cannot be cancelled because it is dispatched or delivered"
        )
      );
    }
    await client.query("COMMIT");

    return res.status(200).json({
      error: false,
      message: "Order Deleted",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};

export const changeStatus = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const orderProductId: string = req.params.orderId;

  let client: PoolClient;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const result = await OrderProduct.changeStatus(client, orderProductId);
    if (result === false) return next(new Error(400, "Order does not exist"));
    await client.query("COMMIT");
    return res.status(200).json({
      error: false,
      message: "Status changed",
      data: [],
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    return next(new Error(500, err));
  } finally {
    client.release();
  }
};
