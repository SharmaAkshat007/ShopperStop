import { PoolClient } from "pg";

const saveQuery = `INSERT INTO order_products(status, product_id, order_id, quantity) VALUES($1, $2, $3, $4)`;
const changeStatusQuery = `UPDATE order_products SET status=true WHERE id=$1 RETURNING *`;

export default class OrderProduct {
  private id?: string;
  private status?: boolean;
  private product_id?: string;
  private order_id?: string;
  private quantity?: number;

  constructor({
    id,
    status,
    product_id,
    order_id,
    quantity,
  }: {
    id: string;
    status: boolean;
    product_id: string;
    order_id: string;
    quantity: number;
  }) {
    this.id = id;
    this.status = status;
    this.product_id = product_id;
    this.order_id = order_id;
    this.quantity = quantity;
  }

  public get getId(): string {
    return this.id;
  }

  public get getStatus(): boolean {
    return this.status;
  }

  public get getProductId(): string {
    return this.product_id;
  }

  public get getOrderId(): string {
    return this.order_id;
  }

  public get getQuantity(): number {
    return this.quantity;
  }

  public async save(client: PoolClient): Promise<void> {
    await client.query(saveQuery, [
      this.status,
      this.product_id,
      this.order_id,
      this.quantity,
    ]);
  }

  public static async changeStatus(
    client: PoolClient,
    orderProductId: string
  ): Promise<boolean> {
    const result = await client.query(changeStatusQuery, [orderProductId]);
    if (result.rows.length === 0) {
      return false;
    }
    return true;
  }
}
