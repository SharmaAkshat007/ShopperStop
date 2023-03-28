import { PoolClient } from "pg";
import { Status } from "../enums";

const getAllQuery = `SELECT A.id as order_id, A.date as date, B.id as order_product_id, B.quantity as quantity, B.status as status, C.address_line1 as address_line1, C.address_line2 as address_line2, C.city as city, C.state as state, C.pin_code as pin_code, C.mobile_no as mobile_no, 
D.name as name, D.description as description, D.price as price, D.image_path, D.image_name, D.mimetype, D.size
FROM orders as A, order_products as B, addresses as C, products as D
WHERE A.buyer_id = $1 AND B.order_id = A.id AND C.id = A.address_id AND D.id = B.product_id`;

const saveQuery = `INSERT INTO orders(buyer_id, address_id) VALUES($1, $2) RETURNING id`;
const deleteQuery = `DELETE FROM order_products WHERE id=$1 RETURNING *`;

const myOrdersQuery = `SELECT order_products.id, order_products.status, order_products.quantity, products.name, products.price, addresses.address_line1, addresses.address_line2, addresses.city, addresses.state, addresses.pin_code, addresses.mobile_no, users.first_name, users.last_name
FROM orders, order_products, products, addresses, users
WHERE orders.buyer_id = users.id AND orders.address_id = addresses.id AND order_products.order_id = orders.id AND order_products.product_id = products.id AND products.user_id = $1
`;

const countQuery = `SELECT * FROM order_products WHERE order_id=$1`;

const deleteParentOrderQuery = `DELETE FROM orders WHERE id=$1`;

export default class Order {
  private id?: string;
  private buyer_id?: string;
  private address_id?: string;
  private date?: Date;

  constructor({
    id,
    buyer_id,
    address_id,
    date,
  }: {
    id: string;
    buyer_id: string;
    address_id: string;
    date: Date;
  }) {
    this.id = id;
    this.buyer_id = buyer_id;
    this.address_id = address_id;
    this.date = date;
  }

  public get getId(): string {
    return this.id;
  }

  public get getBuyerId(): string {
    return this.buyer_id;
  }

  public get getAddressId(): string {
    return this.address_id;
  }

  public get getDate(): Date {
    return this.date;
  }

  public static async getAll(
    client: PoolClient,
    buyer_id: string
  ): Promise<Array<any>> {
    const result = await client.query(getAllQuery, [buyer_id]);
    const items = result.rows.map((item) => {
      item.image_path = `${process.env.DEV_BASE_URL}:${process.env.SERVER_PORT}/images/${item.image_name}`;
      return item;
    });
    return items;
  }

  public static async getMyOrders(
    client: PoolClient,
    seller_id: string
  ): Promise<any> {
    const result = await client.query(myOrdersQuery, [seller_id]);
    return result.rows;
  }

  public async save(client: PoolClient): Promise<string> {
    const result = await client.query(saveQuery, [
      this.buyer_id,
      this.address_id,
    ]);
    const orderId: string = result.rows[0].id;
    return orderId;
  }

  public static async delete(
    client: PoolClient,
    orderId: string,
    buyer_id: string
  ): Promise<boolean> {
    const result = await client.query(deleteQuery, [orderId]);

    if (result.rows.length === 0) return null;
    const orderStatus = result.rows[0].status;
    if (orderStatus === true) return false;

    const parentOrderId = result.rows[0].order_id;

    const data = await client.query(countQuery, [parentOrderId]);

    const count = data.rowCount;

    if (count === 0) {
      await client.query(deleteParentOrderQuery, [parentOrderId]);
    }

    return true;
  }
}
