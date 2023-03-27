import { PoolClient } from "pg";

const createQuery = `INSERT INTO cart_products(buyer_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
const findQuery = `SELECT * FROM cart_products WHERE buyer_id=$1 AND product_id=$2`;
const updateQuery = `UPDATE cart_products SET quantity=$1 WHERE buyer_id=$2 AND product_id=$3 RETURNING *`;
const deleteQuery = `DELETE FROM cart_products WHERE buyer_id=$1 AND product_id=$2 RETURNING *`;
const getAllQuery = `SELECT A.id as id, B.id as product_id, B.name as name, B.description as description, A.quantity as quantity, B.price as price, B.image_path as image_path, B.image_name as image_name, B.mimetype as mimetype 
FROM cart_products as A, products as B
WHERE A.buyer_id = $1 AND B.id = A.product_id
`;
const findWithCartIdQuery = `SELECT * FROM cart_products WHERE buyer_id=$1`;

export default class CartProduct {
  private id?: string;
  private buyer_id?: string;
  private product_id?: string;
  private quantity?: number;

  constructor({
    id,
    buyer_id,
    product_id,
    quantity,
  }: {
    id: string;
    buyer_id: string;
    product_id: string;
    quantity: number;
  }) {
    this.id = id;
    this.buyer_id = buyer_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }

  public get getId(): string {
    return this.id;
  }

  public get getBuyerId(): string {
    return this.buyer_id;
  }

  public get getProductId(): string {
    return this.product_id;
  }

  public get getQuantity(): number {
    return this.quantity;
  }

  public static async getAll(
    client: PoolClient,
    buyer_id: string
  ): Promise<any> {
    const result = await client.query(getAllQuery, [buyer_id]);
    const items = result.rows.map((item) => {
      item.image_path = `${process.env.DEV_BASE_URL}:${process.env.SERVER_PORT}/images/${item.image_name}`;
      return item;
    });
    return items;
  }

  public async save(client: PoolClient): Promise<CartProduct> {
    const result = await client.query(createQuery, [
      this.buyer_id,
      this.product_id,
      this.quantity,
    ]);
    return new CartProduct(result.rows[0]);
  }

  public async find(client: PoolClient): Promise<boolean> {
    const result = await client.query(findQuery, [
      this.buyer_id,
      this.product_id,
    ]);
    if (result.rows.length === 0) return false;
    return true;
  }

  public async update(client: PoolClient): Promise<boolean> {
    const result = await client.query(updateQuery, [
      this.quantity,
      this.buyer_id,
      this.product_id,
    ]);
    if (result.rows.length === 0) {
      return false;
    }
    return true;
  }

  public static async delete(
    client: PoolClient,
    product_id: string,
    buyer_id: string
  ): Promise<boolean> {
    const result = await client.query(deleteQuery, [buyer_id, product_id]);
    if (result.rows.length === 0) {
      return false;
    }
    return true;
  }

  public static async findWithCartId(
    client: PoolClient,
    cartId: string
  ): Promise<Array<CartProduct>> {
    const result = await client.query(findWithCartIdQuery, [cartId]);
    if (result.rows.length === 0) return null;
    const data: Array<CartProduct> = result.rows.map(
      (row) => new CartProduct(row)
    );
    return data;
  }
}
