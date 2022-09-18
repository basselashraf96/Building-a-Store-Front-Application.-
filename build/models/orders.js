"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketOrdersStore = void 0;
const database_1 = __importDefault(require("../database"));
class marketOrdersStore {
    async ordersIndex() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get order. Error: ${err}`);
        }
    }
    async ordersInfoIndex() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders_infos";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get order. Error: ${err}`);
        }
    }
    async ordersShow(id) {
        try {
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async ordersInfoShow(id) {
        try {
            const sql = "SELECT * FROM orders_infos WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async showByCustomerID(customer_id) {
        try {
            const sql = `SELECT * FROM orders WHERE customer_id=${customer_id} AND order_status ='active'`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Customer ${customer_id}. Error: ${err}`);
        }
    }
    async create(customer_id, orderStatus) {
        try {
            const sql = "INSERT INTO orders (customer_id, order_status) VALUES($1, $2) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [customer_id, orderStatus]);
            console.log(`${customer_id}  ${orderStatus}`);
            const row = result.rows[0];
            conn.release();
            return row;
        }
        catch (err) {
            throw new Error(`Couldnt add a new order. Error: ${err}`);
        }
    }
    async createProduct(orderId, productId, quantity) {
        try {
            const sql = "INSERT INTO orders_infos (order_id, products_id, quantity) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderId, productId, quantity]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order  of order id ${orderId}. Error: ${err}`);
        }
    }
}
exports.marketOrdersStore = marketOrdersStore;
// async delete(id: string): Promise<marketOrders> {
//   try {
//     const sql = "DELETE FROM orders WHERE id=($1)";
//     const conn = await Client.connect();
//     const result = await conn.query(sql, [id]);
//     const order = result.rows[0];
//     conn.release();
//     return order;
//   } catch (err) {
//     throw new Error(`Could not delete order ${id}. Error: ${err}`);
//   }
// }
// async update(o: marketOrdersCreateUpdate, id: string): Promise<marketOrders> {
//   try {
//     const sql = `UPDATE orders SET products_id = ($1) , quantity = ($2) , customer_id = ($3) , order_status = ($4) WHERE id=${id} `;
//     const conn = await Client.connect();
//     const result = await conn.query(sql, [
//       o.product_id,
//       o.quantity,
//       o.customer_id,
//       o.status,
//     ]);
//     const order = result.rows[0];
//     conn.release();
//     return order;
//   } catch (err) {
//     throw new Error(
//       `Could not update new order of product id ${o.product_id} and customer id${o.customer_id}. Error: ${err}`
//     );
//   }
// }
