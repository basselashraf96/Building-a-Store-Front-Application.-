"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_1 = require("../models/product");
const store = new product_1.marketProdcutStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const products = await store.show(req.params.id);
    res.json(products);
};
const create = async (req, res) => {
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
    try {
        const product = {
            product_name: req.body.product_name,
            price: req.body.price,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
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
    const productInput = {
        product_name: req.body.product_name,
        price: req.body.price,
    };
    const product = await store.update(productInput, req.params.id);
    res.json(product);
};
const productRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", create);
    app.delete("/products/:id", destroy);
    app.put("/products/:id", update);
};
exports.default = productRoutes;
