"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketCustomerStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/*****************************customer **************************************************************************************/
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALTROUNDS;
class marketCustomerStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM customer";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get customer. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM customer WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find customer ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO customer (first_name, last_name , customer_password) VALUES($1, $2, $3) RETURNING *";
            const hash = await bcrypt_1.default.hashSync(p.password + pepper, parseInt(saltRounds));
            console.log(hash);
            const result = await conn.query(sql, [p.first_name, p.lastName, hash]);
            const customer = result.rows[0];
            conn.release();
            return customer;
        }
        catch (err) {
            throw new Error(`Could not add new customer ${p.first_name} ${p.lastName}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = "DELETE FROM customer WHERE id=($1) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const customer = result.rows[0];
            conn.release();
            return customer;
        }
        catch (err) {
            throw new Error(`Could not delete customer ${id}. Error: ${err}`);
        }
    }
    async update(p, id) {
        try {
            const sql = `UPDATE customer SET first_name = ($1) , last_name = ($2) , customer_password = ($3) WHERE id=${id} RETURNING *`;
            const conn = await database_1.default.connect();
            const hash = await bcrypt_1.default.hashSync(p.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [p.first_name, p.lastName, hash]);
            const customer = result.rows[0];
            conn.release();
            return customer;
        }
        catch (err) {
            throw new Error(`Could not update new customer ${p.first_name} ${p.lastName}. Error: ${err}`);
        }
    }
    async authenticate(input_password, id) {
        const sql = `SELECT * FROM customer WHERE id = ($1)`;
        const conn = await database_1.default.connect();
        const result = await conn.query(sql, [id]);
        if (result.rows.length) {
            const customer = result.rows[0];
            if (bcrypt_1.default.compareSync(input_password + pepper, customer.customer_password)) {
                return customer;
            }
        }
        console.log("incorrect password");
        return null;
    }
}
exports.marketCustomerStore = marketCustomerStore;
