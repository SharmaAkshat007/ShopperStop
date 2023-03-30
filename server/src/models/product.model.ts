import { PoolClient } from "pg";

const saveProductQuery = `INSERT INTO products(name, description, quantity, price, user_id, image_name, image_path, mimetype, size) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
const getAllProductsQuery = `SELECT products.*, users.first_name, users.last_name, users.email FROM products, users WHERE products.user_id = users.id AND products.user_id != $1`;
const getMyProductsQuery = `SELECT * FROM products WHERE user_id=$1`;
const deleteProductQuery = `DELETE FROM products WHERE id=$1 RETURNING user_id`;
const updateProductQuery = `UPDATE products SET name=$1, description=$2, quantity=$3, price=$4 WHERE id=$5 RETURNING user_id`;
const getProductQuery = `SELECT * FROM products WHERE id=$1`;
const updateImageQuery = `UPDATE products SET image_name=$1, image_path=$2, mimetype=$3, size=$4 WHERE id=$5 RETURNING user_id`;

export class ProductSeller {
  private id: string;
  private name: string;
  private description: string;
  private quantity: number;
  private price: number;
  private user_id: string;
  private image_name: string;
  private image_path: string;
  private mimetype: string;
  private size: number;
  private first_name: string;
  private last_name: string;
  private email: string;

  constructor({
    id,
    name,
    description,
    quantity,
    price,
    user_id,
    image_name,
    image_path,
    mimetype,
    size,
    first_name,
    last_name,
    email,
  }: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    user_id: string;
    image_name: string;
    image_path: string;
    mimetype: string;
    size: number;
    first_name: string;
    last_name: string;
    email: string;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.user_id = user_id;
    this.image_name = image_name;
    this.image_path = image_path;
    this.mimetype = mimetype;
    this.size = size;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}

export class Product {
  private id?: string;
  private name?: string;
  private description?: string;
  private quantity?: number;
  private price?: number;
  private user_id?: string;
  private image_name?: string;
  private image_path?: string;
  private mimetype?: string;
  private size?: number;

  constructor({
    id,
    name,
    description,
    quantity,
    price,
    user_id,
    image_name,
    image_path,
    mimetype,
    size,
  }: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    user_id: string;
    image_name: string;
    image_path: string;
    mimetype: string;
    size: number;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.user_id = user_id;
    this.image_name = image_name;
    this.image_path = image_path;
    this.mimetype = mimetype;
    this.size = size;
  }

  public get getId(): string {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getDescription(): string {
    return this.description;
  }

  public get getQuantity(): number {
    return this.quantity;
  }

  public get getPrice(): number {
    return this.price;
  }

  public get getUserId(): string {
    return this.user_id;
  }

  public get getImageName(): string {
    return this.image_name;
  }

  public get getImagePath(): string {
    return this.image_path;
  }

  public get getMimeType(): string {
    return this.mimetype;
  }

  public get getSize(): number {
    return this.size;
  }

  public async save(client: PoolClient): Promise<void> {
    await client.query(saveProductQuery, [
      this.name,
      this.description,
      this.quantity,
      this.price,
      this.user_id,
      this.image_name,
      this.image_path,
      this.mimetype,
      this.size,
    ]);
  }
  public static async getProduct(
    productId: string,
    client: PoolClient
  ): Promise<Product> {
    const result = await client.query(getProductQuery, [productId]);
    return new Product(result.rows[0]);
  }

  public static async getAllProducts(
    client: PoolClient,
    user_id: string
  ): Promise<Array<ProductSeller>> {
    const result = await client.query(getAllProductsQuery, [user_id]);
    const products: Array<ProductSeller> = result.rows.map((data) => {
      data.image_path = `${process.env.DEV_BASE_URL}:${process.env.SERVER_PORT}/images/${data.image_name}`;
      return new ProductSeller(data);
    });
    return products;
  }
  public static async getMyProduct(
    id: string,
    client: PoolClient
  ): Promise<Array<Product>> {
    const result = await client.query(getMyProductsQuery, [id]);
    const products: Array<Product> = result.rows.map((data) => {
      data.image_path = `${process.env.DEV_BASE_URL}:${process.env.SERVER_PORT}/images/${data.image_name}`;
      return new Product(data);
    });
    return products;
  }

  public async update(productId: string, client: PoolClient): Promise<string> {
    const result = await client.query(updateProductQuery, [
      this.name,
      this.description,
      this.quantity,
      this.price,
      productId,
    ]);
    return result.rows[0].user_id;
  }

  public static async updateImage(
    productId: string,
    image: Express.Multer.File,
    client: PoolClient
  ): Promise<string> {
    const result = await client.query(updateImageQuery, [
      image.filename,
      image.path,
      image.mimetype,
      image.size,
      productId,
    ]);
    return result.rows[0].user_id;
  }

  public static async delete(
    productId: string,
    client: PoolClient
  ): Promise<string> {
    const result = await client.query(deleteProductQuery, [productId]);
    return result.rows[0].user_id;
  }
}
