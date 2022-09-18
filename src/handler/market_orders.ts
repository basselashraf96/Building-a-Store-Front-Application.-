import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  marketOrdersStore,
  createOrder,
  createProduct,
} from "../models/orders";

const store = new marketOrdersStore();

const ordersIndex = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const orders = await store.ordersIndex();
  res.json(orders);
};

const ordersInfoIndex = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const orders = await store.ordersInfoIndex();
  res.json(orders);
};

const ordersShow = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const orders = await store.ordersShow(req.params.id);
  res.json(orders);
};

const ordersInfoShow = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const orders = await store.ordersInfoShow(req.params.id);
  res.json(orders);
};

const showByUserId = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const orders = await store.showByCustomerID(req.params.customer_id);
  res.json(orders);
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
    const order: createOrder = {
      id: req.body.id,
      customer_id: req.body.customer_id,
      orderStatus: req.body.orderStatus,
    };

    const newOrder = await store.create(order.customer_id, order.orderStatus);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createproduct = async (req: Request, res: Response) => {
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
    const order: createProduct = {
      id: req.body.id,
      order_id: req.body.order_id,
      products_id: req.body.products_id,
      quantity: req.body.quantity,
    };

    const newOrder = await store.createProduct(
      order.order_id,
      order.products_id,
      order.quantity
    );
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// const destroy = async (req: Request, res: Response) => {
//   const deleted = await store.delete(req.params.id);
//   res.json(deleted);
// };

// const update = async (req: Request, res: Response) => {
//   const orderInput: marketOrdersCreateUpdate = {
//     product_id: req.body.product_id,
//     quantity: req.body.quantity,
//     customer_id: req.body.customer_id,
//     status: req.body.status,
//   };
//   const order = await store.update(orderInput, req.params.id);
//   res.json(order);
// };

const orderRoutes = (app: express.Application) => {
  app.get("/orders", ordersIndex);
  app.get("/orders/info", ordersInfoIndex);
  app.get("/orders/:id", ordersShow);
  app.get("/orders/info/:id", ordersInfoShow);
  app.get("/customer-order/:customer_id", showByUserId);
  app.post("/orders", create);
  app.post("/orders/create-product", createproduct);
  // app.delete("/orders/:id", destroy);
  // app.put("/orders/:id", update);
};

export default orderRoutes;
