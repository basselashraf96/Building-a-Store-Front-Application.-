"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customer_1 = require("../models/customer");
const store = new customer_1.marketCustomerStore();
const index = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const customers = await store.index();
    res.json(customers);
};
const show = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const customers = await store.show(req.params.id);
    res.json(customers);
};
const create = async (req, res) => {
    try {
        const customer = {
            first_name: req.body.first_name,
            lastName: req.body.lastName,
            password: req.body.password,
        };
        const newCustomer = await store.create(customer);
        var token = jsonwebtoken_1.default.sign({ customer: newCustomer }, process.env.SECRET_TOKEN);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
};
const update = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
    }
    catch (err) {
        res.status(401);
        res.json("Access denied, invalid token");
        return;
    }
    const CustomerInput = {
        first_name: req.body.first_name,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    const customer = await store.update(CustomerInput, req.params.id);
    res.json(customer);
};
const authenticate = async (req, res) => {
    const customer = {
        password: req.body.password,
        id: req.body.id,
    };
    try {
        const newCustomer = await store.authenticate(customer.password, customer.id);
        var token = jsonwebtoken_1.default.sign({ customer: newCustomer }, process.env.SECRET_TOKEN);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const CustomerRoutes = (app) => {
    app.get("/customers", index);
    app.get("/customers/:id", show);
    app.post("/customers", create);
    app.post("/customers/authenticate", authenticate);
    app.delete("/customers/:id", destroy);
    app.put("/customers/:id", update);
};
exports.default = CustomerRoutes;
