"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketProdcutStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class marketProdcutStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM product";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get product. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM product WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const sql = "INSERT INTO product (price, product_name) VALUES($1, $2) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.price, p.product_name]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product ${p.product_name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM product WHERE id=($1) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
    async update(p, id) {
        try {
            const sql = `UPDATE product SET price = ($1) , product_name = ($2) WHERE id=${id} RETURNING * `;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.price, p.product_name]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not update new product ${p.product_name}. Error: ${err}`);
        }
    }
}
exports.marketProdcutStore = marketProdcutStore;
/****************************************************************************************************************************/
