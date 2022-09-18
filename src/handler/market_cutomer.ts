import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  marketCustomerStore,
  marketCustomerCreateUpdate,
  marketCustomer,
  customerAuthenticate,
} from "../models/customer";

const store = new marketCustomerStore();

const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const customers = await store.index();
  res.json(customers);
};

const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
  const customers = await store.show(req.params.id);
  res.json(customers);
};

const create = async (req: Request, res: Response) => {
  try {
    const customer: marketCustomerCreateUpdate = {
      first_name: req.body.first_name,
      lastName: req.body.lastName,
      password: req.body.password,
    };

    const newCustomer = await store.create(customer);
    var token = jwt.sign(
      { customer: newCustomer },
      process.env.SECRET_TOKEN as string
    );
    res.json(token);
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
  const CustomerInput: marketCustomerCreateUpdate = {
    first_name: req.body.first_name,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  const customer = await store.update(CustomerInput, req.params.id);
  res.json(customer);
};

const authenticate = async (req: Request, res: Response) => {
  const customer: customerAuthenticate = {
    password: req.body.password,
    id: req.body.id,
  };
  try {
    const newCustomer = await store.authenticate(
      customer.password,
      customer.id
    );
    var token = jwt.sign(
      { customer: newCustomer },
      process.env.SECRET_TOKEN as string
    );
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const CustomerRoutes = (app: express.Application) => {
  app.get("/customers", index);
  app.get("/customers/:id", show);
  app.post("/customers", create);
  app.post("/customers/authenticate", authenticate);
  app.delete("/customers/:id", destroy);
  app.put("/customers/:id", update);
};

export default CustomerRoutes;
