import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  marketProdcutStore,
  marketProductCreateUpdate,
} from "../models/product";

const store = new marketProdcutStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const products = await store.show(req.params.id);
  res.json(products);
};

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  try {
    const product: marketProductCreateUpdate = {
      product_name: req.body.product_name,
      price: req.body.price,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const update = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const productInput: marketProductCreateUpdate = {
    product_name: req.body.product_name,
    price: req.body.price,
  };
  const product = await store.update(productInput, req.params.id);
  res.json(product);
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.delete("/products/:id", destroy);
  app.put("/products/:id", update);
};

export default productRoutes;
