// @ts-ignore
import Client from "../database";

/*****************************PRODUCTS *********************************************************************************/

export type marketProduct = {
  id: number;
  price: number;
  product_name: string;
};
export type marketProductCreateUpdate = {
  price: number;
  product_name: string;
};

export class marketProdcutStore {
  async index(): Promise<marketProduct[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM product";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }

  async show(id: string): Promise<marketProduct> {
    try {
      const sql = "SELECT * FROM product WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: marketProductCreateUpdate): Promise<marketProduct> {
    try {
      const sql =
        "INSERT INTO product (price, product_name) VALUES($1, $2) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [p.price, p.product_name]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(
        `Could not add new product ${p.product_name}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<marketProduct> {
    try {
      const sql = "DELETE FROM product WHERE id=($1) RETURNING *";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
  async update(
    p: marketProductCreateUpdate,
    id: string
  ): Promise<marketProduct> {
    try {
      const sql = `UPDATE product SET price = ($1) , product_name = ($2) WHERE id=${id} RETURNING * `;

      const conn = await Client.connect();

      const result = await conn.query(sql, [p.price, p.product_name]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(
        `Could not update new product ${p.product_name}. Error: ${err}`
      );
    }
  }
}
/****************************************************************************************************************************/
