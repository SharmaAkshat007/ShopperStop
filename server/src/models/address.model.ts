import { PoolClient } from "pg";

const addressCreateQuery = `INSERT INTO addresses(user_id, address_line1, address_line2, city, state, pin_code, mobile_no) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
const getAllQuery = `SELECT * FROM addresses WHERE user_id=$1`;
const deleteQuery = `DELETE FROM addresses WHERE user_id=$1 AND id=$2 RETURNING *`;
const updateQuery = `UPDATE addresses SET address_line1=$1, address_line2=$2, city=$3, state=$4, pin_code=$5, mobile_no=$6 WHERE id=$7 AND user_id=$8 RETURNING *`;

export default class Address {
  private id?: string;
  private user_id?: string;
  private address_line1?: string;
  private address_line2?: string;
  private city?: string;
  private state?: string;
  private pin_code?: string;
  private mobile_no?: string;

  constructor({
    id,
    user_id,
    address_line1,
    address_line2,
    city,
    state,
    pin_code,
    mobile_no,
  }: {
    id: string;
    user_id: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    pin_code: string;
    mobile_no: string;
  }) {
    this.id = id;
    this.user_id = user_id;
    this.address_line1 = address_line1;
    this.address_line2 = address_line2;
    this.city = city;
    this.state = state;
    this.pin_code = pin_code;
    this.mobile_no = mobile_no;
  }

  public get getId(): string {
    return this.id;
  }

  public get getUserId(): string {
    return this.user_id;
  }

  public get getAddressLine1(): string {
    return this.address_line1;
  }

  public get getAddressLine2(): string {
    return this.address_line2;
  }

  public get getCity(): string {
    return this.city;
  }

  public get getState(): string {
    return this.state;
  }

  public get getPinCode(): string {
    return this.pin_code;
  }

  public get getMobileNo(): string {
    return this.mobile_no;
  }

  public static async getAll(
    client: PoolClient,
    user_id: string
  ): Promise<Array<Address>> {
    const result = await client.query(getAllQuery, [user_id]);
    const data: Array<Address> = result.rows.map((row) => new Address(row));
    return data;
  }

  public async save(client: PoolClient, user_id: string): Promise<any> {
    const res = await client.query(addressCreateQuery, [
      user_id,
      this.address_line1,
      this.address_line2,
      this.city,
      this.state,
      this.pin_code,
      this.mobile_no,
    ]);
    return res.rows;
  }

  public async update(client: PoolClient): Promise<boolean> {
    const result = await client.query(updateQuery, [
      this.address_line1,
      this.address_line2,
      this.city,
      this.state,
      this.pin_code,
      this.mobile_no,
      this.id,
      this.user_id,
    ]);
    if (result.rows.length === 0) {
      return false;
    }
    return true;
  }

  public static async delete(
    client: PoolClient,
    user_id: string,
    address_id: string
  ): Promise<boolean> {
    const result = await client.query(deleteQuery, [user_id, address_id]);
    if (result.rows.length === 0) {
      return false;
    }
    return true;
  }
}
