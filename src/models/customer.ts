import Client from "../database";
import bcrypt from "bcrypt";
/*****************************customer **************************************************************************************/
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALTROUNDS;

export type customerAuthenticate = {
  password: string;
  id: string;
};

export type marketCustomer = {
  id: number;
  first_name: string;
  lastName: string;
  password: string;
};
export type marketCustomerCreateUpdate = {
  first_name: string;
  lastName: string;
  password: string;
};

export class marketCustomerStore {
  async index(): Promise<marketCustomer[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM customer";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get customer. Error: ${err}`);
    }
  }

  async show(id: string): Promise<marketCustomer> {
    try {
      const sql = "SELECT * FROM customer WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find customer ${id}. Error: ${err}`);
    }
  }

  async create(p: marketCustomerCreateUpdate): Promise<marketCustomer> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO customer (first_name, last_name , customer_password) VALUES($1, $2, $3) RETURNING *";

      const hash: string = await bcrypt.hashSync(
        p.password + pepper,
        parseInt(<string>saltRounds)
      );
      console.log(hash);
      const result = await conn.query(sql, [p.first_name, p.lastName, hash]);

      const customer = result.rows[0];

      conn.release();

      return customer;
    } catch (err) {
      throw new Error(
        `Could not add new customer ${p.first_name} ${p.lastName}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<marketCustomer> {
    try {
      const sql = "DELETE FROM customer WHERE id=($1) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const customer = result.rows[0];

      conn.release();

      return customer;
    } catch (err) {
      throw new Error(`Could not delete customer ${id}. Error: ${err}`);
    }
  }
  async update(
    p: marketCustomerCreateUpdate,
    id: string
  ): Promise<marketCustomer> {
    try {
      const sql = `UPDATE customer SET first_name = ($1) , last_name = ($2) , customer_password = ($3) WHERE id=${id} RETURNING *`;

      const conn = await Client.connect();
      const hash: string = await bcrypt.hashSync(
        p.password + pepper,
        parseInt(<string>saltRounds)
      );
      const result = await conn.query(sql, [p.first_name, p.lastName, hash]);

      const customer = result.rows[0];

      conn.release();

      return customer;
    } catch (err) {
      throw new Error(
        `Could not update new customer ${p.first_name} ${p.lastName}. Error: ${err}`
      );
    }
  }

  async authenticate(
    input_password: string,
    id: string
  ): Promise<customerAuthenticate | null> {
    const sql = `SELECT * FROM customer WHERE id = ($1)`;

    const conn = await Client.connect();

    const result = await conn.query(sql, [id]);
    if (result.rows.length) {
      const customer = result.rows[0];

      if (
        bcrypt.compareSync(input_password + pepper, customer.customer_password)
      ) {
        return customer;
      }
    }
    console.log("incorrect password");
    return null;
  }
}
